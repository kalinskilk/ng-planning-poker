import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Observer } from 'rxjs';
import { IDataRoom } from 'src/app/interfaces/data-room';
import { IRoom } from 'src/app/interfaces/room';
import { IVotesRoom } from 'src/app/interfaces/votes-room';
import environment from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PlanningService {
  constructor(private socket: Socket, private http: HttpClient) {}

  send(votesRoom: IVotesRoom, roomId: string) {
    this.socket.emit('vote', { votesRoom, roomId });
  }

  listenerRoom(roomId: string) {
    return new Observable((observer: Observer<IDataRoom>) => {
      this.socket.on(roomId, (result: IDataRoom) => {
        observer.next(result);
      });
    });
  }

  flipCards(roomId: string) {
    this.socket.emit('flip-cards', { roomId });
  }

  restartVotation(roomId: string) {
    this.socket.emit('restart-votation', { roomId });
  }

  getVotes(roomId: string): Observable<{
    data: {
      room: IRoom | null;
    };
    success: boolean;
  }> {
    return this.http.get<{
      data: {
        room: IRoom | null;
      };
      success: boolean;
    }>(`${environment.API}/get-votes?roomId=${roomId}`);
  }
}
