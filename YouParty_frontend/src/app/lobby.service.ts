import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Observable, Subscription, of, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  constructor(private http: HttpClient) { }

  private lobbyId: number;
  private lobbyUrl = environment.backendUrl + '/lobby';

  create(): Observable<number> {
    console.log("creating lobby");
    return this.http.post<number>(`${this.lobbyUrl}/createLobby`, {})
      .pipe(
        catchError(this.handleError('createLobby', 0)),
        map((id) => {
          this.lobbyId = id;
          return id;
        })
      )
  }

  getLobbyId = (): number => this.lobbyId;

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
