import { SongQueueService } from './song-queue.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private player: YT.Player;
  private videoid = 'cQKGUgOfD8U';

  constructor(private songQueueService: SongQueueService) { }

  createPlayer(player: YT.Player) {
    this.player = player;
  }

  getPlayer(): YT.Player {
    return this.player;
  }

  onStateChange(event): void {
    const first = this.songQueueService.songs[0];
    // this.songQueueService.pop();
  }
}
