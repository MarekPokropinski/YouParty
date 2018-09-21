import { YoutubeService } from './../youtube.service';
import { Component, OnInit } from '@angular/core';

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

  }

  savePlayer(player) {
    // autoplay
    player.playVideo();
    this.youtubeService.createPlayer(player);
    console.log('player instance', player);
  }
  onStateChange(event) {
    console.log('player state', event.data);
  }

  loadImage(src: string, onLoad: any) {
    const downloadingImage = new Image();
    downloadingImage.onload = onLoad;
    downloadingImage.src = src;
  }

  onImageRecieved(data: string) {
    // start loading
    this.loadImage(`data:image/png;base64,${data}`, () => {
      this.imgPath = `data:image/png;base64,${data}`;
      // end loading
    });
  }

}
