import { ActivatedRoute, Router } from '@angular/router';
import { SongQueueService } from './../song-queue.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  inputValue = '';

  constructor(
    private songQueueService: SongQueueService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    console.log(this.router.url);
    console.log(this.route);
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.songQueueService.init(8);
  }

  handleSubmit(): void {
    this.songQueueService.push(this.inputValue);
    this.inputValue = '';
  }
}
