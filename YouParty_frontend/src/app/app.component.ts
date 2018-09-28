import { SongQueueService } from './song-queue.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public songQueueService: SongQueueService
  ) { }

  title = 'YouParty';
}
