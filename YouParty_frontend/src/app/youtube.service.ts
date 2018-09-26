import { Observable, Observer } from 'rxjs';
import { SongQueueService } from './song-queue.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private player: YT.Player;
  private videoid = 'cQKGUgOfD8U';
  private listeners: Array<Observer<string>> = [];
  public videoChanges = new Observable<string>((observer) => {
    this.listeners.push(observer);
    return () => {
      const index = this.listeners.indexOf(observer);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  });

  constructor(
    private songQueueService: SongQueueService
  ) {
    this.init();
  }

  init(): void {
    this.songQueueService.onChange(() => this.onQueueChange());
  }

  createPlayer(player: YT.Player) {
    this.player = player;
  }

  getPlayer(): YT.Player {
    return this.player;
  }

  onStateChange(event): void {
    console.log(this.songQueueService);
    if (event.data === 0) {
      if (this.songQueueService.songs.length > 0) {

        const first = this.songQueueService.songs[0];
        this.startSong(first.id);
        this.songQueueService.pop();
      }
    }
  }

  onQueueChange(): void {
    console.log('Queue changed', this.player.getPlayerState());
    if (this.player.getPlayerState() !== 1 && this.player.getPlayerState() !== 2 && this.songQueueService.songs.length > 0) {
      const first = this.songQueueService.songs[0];
      this.startSong(first.id);
    }
  }

  private startSong(id: string): void {
    this.videoid = id;
    this.player.loadVideoById(id, 0, 'small');
    for (const listener of this.listeners) {
      listener.next(id);
    }
  }
}
