import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Message } from '@stomp/stompjs';
import { StompService } from '@stomp/ng2-stompjs';
import { Observable, Subscription, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongQueueService implements OnDestroy {

  lobbyId: number;
  public songs: Array<string> = [];
  private lobbyUrl = 'http://localhost:8080/lobby';

  private subscription: Subscription;
  public messages: Observable<Message>;

  constructor(
    private http: HttpClient,
    private _stompService: StompService
  ) {
    this.init();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  init(): void {
    console.log(`${this.lobbyUrl}/createLobby`);
    this.http.post<number>(`${this.lobbyUrl}/createLobby`, {})
      .pipe(
        catchError(this.handleError('createLobby', 0))
      )
      .subscribe((id) => {
        this.lobbyId = id;
        this.messages = this._stompService.subscribe(`/stomp/lobby/queue/${this.lobbyId}`);
        this.subscription = this.messages.subscribe((message: Message) => {
          try {
            console.log(message);
            this.songs = JSON.parse(message.body) as Array<string>;
          } catch (error) {
            console.error(`Got error while receiving/parsing message: ${error}`);
          }
        });
      });
  }

  pop(): void {
    this.songs.shift();
  }

  push(song: string): void {
    this.songs.push(song);
    // send new song to service
    this._stompService.publish(`/stomp/lobby/add/${this.lobbyId}`, `"${song}"`);
  }
}
