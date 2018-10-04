import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Message } from '@stomp/stompjs';
import { StompService } from '@stomp/ng2-stompjs';
import { Observable, Subscription, of, Observer } from 'rxjs';
import { environment } from '../environments/environment';
import { LobbyService } from './lobby.service';

@Injectable({
  providedIn: 'root'
})
export class SongQueueService implements OnDestroy {

  public songs: Array<Video> = [];
  public changes = new Observable<void>((observer) => {
    this.listeners.push(observer);
    return () => {
      const index = this.listeners.indexOf(observer);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  });
  public messages: Observable<Message>;
  private youUrl = environment.backendUrl + '/you';
  private queueUrl = `${environment.backendUrl}/lobby/queue`;
  private listeners: Array<Observer<void>> = [];
  private subscription: Subscription;

  constructor(
    private http: HttpClient,
    private _stompService: StompService,
    private lobbyService: LobbyService
  ) { }

  private lobbyId: number;

  init(lobbyId: number): void {
    this.lobbyId = lobbyId;
    this.messages = this._stompService.subscribe(`/queue/${this.lobbyId}`);
    this.subscription = this.messages.subscribe((message: Message) => {
      try {
        this.songs = JSON.parse(message.body) as Array<Video>;
        // iterate backwards so you can unsubscribe in subscribtion
        this.notifyListeners();
      } catch (error) {
        console.error(`Got error while receiving/parsing message: ${error}`);
      }
    });
    this.http.get<Array<Video>>(`${this.queueUrl}?lobbyId=${this.lobbyId}`).subscribe((songs) => {
      this.songs = songs;
      this.notifyListeners();
    });
  }

  private notifyListeners(): void {
    for (let i = this.listeners.length - 1; i >= 0; i--) {
      this.listeners[i].next(null);
    }
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
      const _changes = this.changes.subscribe(() => {
        _changes.unsubscribe();
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
        }
      });
  }
}
