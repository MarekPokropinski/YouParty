import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SongQueueService {

  songs: Array<string> = ['Never', 'Gonna', 'Give', 'You', 'Up'];
  queueUrl: '';

  constructor(
    private http: HttpClient
  ) { }

  handleError(name: string, incontinious: any): any {
    return incontinious;
  }

  start(): void {
    // get songs in queue
  }

  pop(): void {
    this.songs.shift();
  }

  push(song: string): void {
    this.songs.push(song);
    // send new song to service
    this.http.post<string[]>(this.queueUrl, song)
    .pipe(
      catchError(this.handleError('postSong', []))
    )
    .subscribe((songs) => {
      this.songs = songs;
    });
  }
}
