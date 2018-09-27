import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Message } from '@stomp/stompjs';
import { StompService } from '@stomp/ng2-stompjs';
import { Observable, Subscription, of, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongQueueService implements OnDestroy {

  public songs: Array<Video> = [];
  public changes = new Observable<void>((observer) => {
    this.listeners.push(observer);
    return {
      unsubscribe() {
        const index = this.listeners.indexof(observer);
        if (index > -1) {
          this.listeners.splice(index, 1);
        }
      }
    };
  });
  public messages: Observable<Message>;
  private lobbyId: number;
  private lobbyUrl = 'http://localhost:8080/lobby';
  private youUrl = 'http://localhost:8080/you';
  private listeners: Array<Observer<void>> = [];
  private subscription: Subscription;

  constructor(
    private http: HttpClient,
    private _stompService: StompService
  ) {
    this.init();
  }

  init(): void {
    this.http.post<number>(`${this.lobbyUrl}/createLobby`, {})
      .pipe(
        catchError(this.handleError('createLobby', 0))
      )
      .subscribe((id) => {
        this.lobbyId = id;
        this.messages = this._stompService.subscribe(`/queue/${this.lobbyId}`);
        this.subscription = this.messages.subscribe((message: Message) => {
          try {
            this.songs = JSON.parse(message.body) as Array<Video>;
          } catch (error) {
            console.error(`Got error while receiving/parsing message: ${error}`);
          }
        });
      });
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

  pop(): Observable<void> {
    this._stompService.publish(`/stomp/skip/${this.lobbyId}`, '');
    return new Observable<void>((observer) => {
      const changes = this.changes.subscribe(() => {
        changes.unsubscribe();
        observer.next(null);
      });
    });
  }

  push(song: string): void {
    this.http.get<Array<Video>>(`${this.youUrl}/find?title=${song}`, {})
      .pipe(
        catchError(this.handleError('findSong', []))
      )
      .subscribe((videoArr) => {
        if (videoArr.length > 0) {
          const front = videoArr[0];
          this.songs.push(front);
          // send new song to service
          this._stompService.publish(`/stomp/add/${this.lobbyId}`, JSON.stringify(front));
          // iterate backwards so you can unsubscribe in subscribtion
          for (let i = this.listeners.length - 1; i >= 0; i--) {
            this.listeners[i].next(null);
          }
        }
      });
  }
}
