import { Observable, Observer, Subscription } from 'rxjs';
import { SongQueueService } from './song-queue.service';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService implements OnDestroy {

  public videoChanges = new Observable<string>((observer) => {
    this.listeners.push(observer);
    return () => {
      const index = this.listeners.indexOf(observer);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  });
  private player: YT.Player;
  private listeners: Array<Observer<string>> = [];
  private songQueueChanges: Subscription;

  constructor(
    private songQueueService: SongQueueService
  ) {
    this.init();
  }

  init(): void {
    this.songQueueChanges = this.songQueueService.changes.subscribe((_) => this.onQueueChange());
  }

  ngOnDestroy() {
    if (this.songQueueChanges) {
      this.songQueueChanges.unsubscribe();
    }
  }

  createPlayer(player: YT.Player) {
    this.player = player;
  }

  getPlayer(): YT.Player {
    return this.player;
  }

  onStateChange(event): void {
    // when stopped playing
    if (event.data === 0) {
      if (this.songQueueService.songs.length > 0) {
        // delete first song
        this.songQueueService.pop().subscribe((_) => {
          // if there is next song play it
          if (this.songQueueService.songs.length > 0) {
            const first = this.songQueueService.songs[0];
            this.startSong(first.id);
          }
        });
      }
    }
  }

  onQueueChange(): void {
    if (this.player && this.player.getPlayerState() !== 1 && this.player.getPlayerState() !== 2 && this.songQueueService.songs.length > 0) {
      const first = this.songQueueService.songs[0];
      this.startSong(first.id);
    }
  }

  private startSong(id: string): void {
    this.player.loadVideoById(id, 0, 'small');
    for (const listener of this.listeners) {
      listener.next(id);
    }
  }
}
