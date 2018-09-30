import { YoutubeService } from './../youtube.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-song-controller',
  templateUrl: './song-controller.component.html',
  styleUrls: ['./song-controller.component.css']
})
export class SongControllerComponent implements OnInit {

  pausePath = 'assets/baseline-pause-24px.svg';
  playPath = 'assets/baseline-play_arrow-24px.svg';
  backPath = 'assets/baseline-skip_previous-24px.svg';
  skipPath = 'assets/baseline-skip_next-24px.svg';

  pauseImage: HTMLImageElement;
  playImage: HTMLImageElement;

  isPlaying = true;

  constructor(private youtubeService: YoutubeService) { }

  ngOnInit() {
    // load images
    this.pauseImage = new Image();
    this.pauseImage.src = this.pausePath;

    this.playImage = new Image();
    this.playImage.src = this.playPath;
  }

  onPause() {
    this.youtubeService.getPlayer().pauseVideo();
    this.isPlaying = false;
  }

  onPlay() {
    this.youtubeService.getPlayer().playVideo();
    this.isPlaying = true;
  }

}
