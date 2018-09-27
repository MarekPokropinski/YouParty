import { YoutubeService } from './../youtube.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.css']
})
export class ImageDisplayComponent implements OnInit, OnDestroy {

  public imgPath = 'https://img.youtube.com/vi/cQKGUgOfD8U/maxresdefault.jpg';
  private videoChanges: Subscription;

  constructor(private youtubeService: YoutubeService) { }

  ngOnInit() {
    this.videoChanges = this.youtubeService.videoChanges
      .subscribe((videoid) => {
        this.imgPath = `https://img.youtube.com/vi/${videoid}/maxresdefault.jpg`;
      });
  }

  ngOnDestroy() {
    this.videoChanges.unsubscribe();
  }

  savePlayer(player) {
    this.youtubeService.createPlayer(player);
  }
  onStateChange(event) {
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
}
