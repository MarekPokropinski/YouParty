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
  public songs: Array<any> = [];
  private lobbyUrl = 'http://localhost:8080/lobby';
  private youUrl = 'http://localhost:8080/you';

  private listeners: Array<any> = [];
  public changes = new Observable<void>((observer) => {

  });

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
        this.messages = this._stompService.subscribe(`/queue/${this.lobbyId}`);
        this.subscription = this.messages.subscribe((message: Message) => {
          try {
            console.log('Received: ', message);
            this.songs = JSON.parse(message.body) as Array<string>;
          } catch (error) {
            console.error(`Got error while receiving/parsing message: ${error}`);
          }
        });
      });
  }

  pop(): void {
    this._stompService.publish(`/stomp/skip/${this.lobbyId}`, '');
  }

  push(song: string): void {
    this.http.get<Array<any>>(`${this.youUrl}/find?title=${song}`, {})
      .pipe(
        catchError(this.handleError('findSong', []))
      )
      .subscribe((videoArr) => {
        if (videoArr.length > 0) {
          const front = videoArr[0];
          console.log(front);
          this.songs.push(front);
          // send new song to service
          this._stompService.publish(`/stomp/add/${this.lobbyId}`, JSON.stringify(front));
          for (let i = 0; i < this.listeners.length; i++) {
            this.listeners[i]();
          }
        }
      });
  }

  onChange(func: any): void {
    this.listeners.push(func);
  }
}
