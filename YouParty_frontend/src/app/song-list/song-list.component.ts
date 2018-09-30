import { SongQueueService } from './../song-queue.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  inputValue = '';

  constructor(public songQueueService: SongQueueService) { }

  ngOnInit() {
  }

  handleSubmit(): void {
    this.songQueueService.push(this.inputValue);
    this.inputValue = '';
  }

}
