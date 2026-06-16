import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createGame(): Observable<Game> {
    return this.http.post<Game>(`${this.apiUrl}/games`, {});
  }

  getGame(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/games/${id}`);
  }

  makeMove(id: string, position: number): Observable<Game> {
    return this.http.post<Game>(`${this.apiUrl}/games/${id}/move`, {
      position,
    });
  }
}
