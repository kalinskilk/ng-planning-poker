import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlayer } from 'src/app/interfaces/player';
import environment from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RoomService {
  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  createNewRoom(player: IPlayer): Observable<{
    data: { roomId: string } | null;
    success: boolean;
    message: string;
  }> {
    return this.http.post<{
      data: { roomId: string } | null;
      success: boolean;
      message: string;
    }>(`${environment.API}/create-new-room`, player, this.httpOptions);
  }

  joinRoom(
    player: IPlayer,
    roomId: string
  ): Observable<{
    data: { roomId: string } | null;
    success: boolean;
    message: string;
  }> {
    return this.http.post<{
      data: { roomId: string };
      success: boolean;
      message: string;
    }>(`${environment.API}/join-room`, { player, roomId }, this.httpOptions);
  }
}
