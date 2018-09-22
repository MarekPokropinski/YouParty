import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  songs: Array<string> = ['Never', 'Gonna', 'Give', 'You', 'Up'];
  songSuggestions: Array<string> = ['Never', 'Gonna'];
  inputValue = '';

  constructor() { }

  ngOnInit() {
  }

  handleSubmit(): void {
    this.songs.push(this.inputValue);
    this.inputValue = '';
  }

}
