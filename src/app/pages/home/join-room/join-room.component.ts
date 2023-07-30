import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { RoleEnum } from 'src/app/enums/role';
import { IPlayer } from 'src/app/interfaces/player';
import { RoomService } from 'src/app/services/room.service';
import { StorageEnum, StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss'],
})
export class JoinRoomComponent {
  exitPage = false;
  player: IPlayer = { name: '', role: RoleEnum.PLAYER };

  room = '';

  @ViewChild('templateButtonNewRoom', { read: ViewContainerRef })
  templateButtonNewRoom!: ViewContainerRef;
  loading = false;
  constructor(
    private storageService: StorageService,
    private roomService: RoomService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) {
    this.room = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.getUser();
  }

  getUser(): void {
    const user = this.storageService.getItem(StorageEnum.USER);
    if (!user) {
      return;
    }
    this.player = JSON.parse(user) as IPlayer;
  }

  joinRoom(): void {
    if (this.loading) {
      return;
    }
    if (!this.player.name || !this.room) {
      const message = `O campo ${
        !this.player.name ? 'Nome' : 'Sala'
      } é obrigatório.`;
      this.toastService.error({ message });
      return;
    }
    this.loading = true;
    this.roomService
      .joinRoom(this.player, this.room)
      .pipe(first())
      .subscribe(
        (result) => {
          if (!result.success) {
            this.toastService.error({
              message: result.message,
              override: { timeOut: 5000 },
            });
            return;
          }

          if (result?.data?.roomId) {
            this.exitPage = true;
            this.storageService.setItem(
              StorageEnum.USER,
              JSON.stringify({ name: this.player.name, role: this.player.role })
            );
            this.storageService.setItem(
              StorageEnum.JOINED_ROOM,
              result?.data?.roomId
            );
            this.router.navigate([`/planning/${result?.data?.roomId}`]);
            this.loading = false;
          }
        },
        (err) => {
          this.loading = false;
        }
      );
  }
}
