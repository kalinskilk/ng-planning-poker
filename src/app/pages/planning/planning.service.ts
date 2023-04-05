import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({ providedIn: 'root' })
export class PlanningService {
  constructor(private socket: Socket) {}

  send(vote: string) {
    this.socket.emit('sendMessage', vote);
  }
}
