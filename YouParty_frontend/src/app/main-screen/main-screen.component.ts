import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { SongQueueService } from '../song-queue.service';
import { LobbyService } from '../lobby.service';


@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  qrCodeUrl: string = environment.backendUrl + '/qrcode?partyId=';
  lobbyId: number;

  constructor(
    private songQueueService: SongQueueService,
    private lobbyService: LobbyService
  ) { }

  ngOnInit() {
    this.lobbyService.create().subscribe((id) => {
      this.lobbyId = id;
      console.log(`created lobby with id: ${this.lobbyId}`);
      this.songQueueService.init(this.lobbyId);
    })
  }

  title = 'YouParty';
}
