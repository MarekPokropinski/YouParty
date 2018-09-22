import { SongQueueService } from './../song-queue.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  // songs: Array<string> = ['Never', 'Gonna', 'Give', 'You', 'Up'];
  songSuggestions: Array<string> = ['Never', 'Gonna'];
  inputValue = '';

  constructor(public songQueueService: SongQueueService) { }

  ngOnInit() {
  }

  handleSubmit(): void {
    this.songQueueService.push(this.inputValue);
    this.inputValue = '';
  }

}
