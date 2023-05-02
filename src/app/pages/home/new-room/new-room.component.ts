import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { RoleEnum } from 'src/app/enums/role';
import { IPlayer } from 'src/app/interfaces/player';
import { RoomService } from 'src/app/services/room.service';
import { StorageEnum, StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.scss'],
})
export class NewRoomComponent {
  exitPage = false;
  name = '';
  role = RoleEnum.SCRUM_MASTER;

  @ViewChild('templateButtonNewRoom', { read: ViewContainerRef })
  templateButtonNewRoom!: ViewContainerRef;

  constructor(
    private storageService: StorageService,
    private roomService: RoomService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.getUser();
  }

  getUser(): void {
    const user = this.storageService.getItem(StorageEnum.USER);
    if (!user) {
      return;
    }
    const _user = JSON.parse(user) as IPlayer;
    this.name = _user.name;
    this.role = _user.role;
  }

  createNewRoom(): void {
    if (!this.name) {
      return;
    }
    this.exitPage = true;
    this.roomService
      .createNewRoom({ name: this.name, role: this.role })
      .pipe(first())
      .subscribe((result) => {
        if (!result.success) {
          this.toastService.error({
            message: result.message,
            override: { timeOut: 5000 },
          });
          return;
        }

        this.storageService.setItem(
          StorageEnum.USER,
          JSON.stringify({ name: this.name, role: this.role })
        );
        this.router.navigate([`/planning/${result?.data?.roomId}`]);
      });
  }
}
