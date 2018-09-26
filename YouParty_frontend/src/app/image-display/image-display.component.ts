import { YoutubeService } from './../youtube.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.css']
})
export class ImageDisplayComponent implements OnInit {

  imgPath = 'https://img.youtube.com/vi/cQKGUgOfD8U/maxresdefault.jpg';
  player: YT.Player;
  videoid = 'cQKGUgOfD8U';

  constructor(private youtubeService: YoutubeService) { }

  ngOnInit() {
    this.youtubeService.videoChanges
      .subscribe((videoid) => {
        this.videoid = videoid;
        this.imgPath = `https://img.youtube.com/vi/${videoid}/maxresdefault.jpg`;
      });
  }

  savePlayer(player) {
    // autoplay
    // player.playVideo();
    this.youtubeService.createPlayer(player);
    console.log('player instance', player);
  }
  onStateChange(event) {
    console.log('player state', event.data);
    this.youtubeService.onStateChange(event);
  }

  loadImage(src: string): Observable<string> {
    const downloadingImage = new Image();
    const ret = new Observable<string>((observer) => {
      downloadingImage.onload = () => observer.next(src);
      return { unsubscribe() { } };
    });
    return ret;
  }

  onImageRecieved(data: string) {
    // start loading
    this.loadImage(`data:image/png;base64,${data}`)
      .subscribe(() => {
        this.imgPath = `data:image/png;base64,${data}`;
        // end loading
      });
  }

}
