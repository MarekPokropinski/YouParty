import { SongQueueService } from './song-queue.service';
import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private qrCodeUrl: string = environment.backendUrl + '/qrcode?partyId=';

  constructor(
    public songQueueService: SongQueueService
  ) { }

  title = 'YouParty';
}
