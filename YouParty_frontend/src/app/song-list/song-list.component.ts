import { SongQueueService } from './../song-queue.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-song-list',
    templateUrl: './song-list.component.html',
    styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

    inputValue = '';
    @Input() lobbyId: number;

    constructor(public songQueueService: SongQueueService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.songQueueService.init(parseInt(id));
        }
    }

    handleSubmit(): void {
        this.songQueueService.push(this.inputValue);
        this.inputValue = '';
    }
}
