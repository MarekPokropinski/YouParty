import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private player: YT.Player;
  private videoid = 'cQKGUgOfD8U';

  constructor() { }

  createPlayer(player: YT.Player) {
    this.player = player;
  }

  getPlayer(): YT.Player {
    return this.player;
  }
}
