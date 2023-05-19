import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoleEnum } from 'src/app/enums/role';
import { IPlayer } from 'src/app/interfaces/player';
import { IVotesRoom } from 'src/app/interfaces/votes-room';
import { RoomService } from 'src/app/services/room.service';
import { StorageEnum, StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { PlanningService } from './planning.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
})
export class PlanningComponent implements OnInit, OnDestroy {
  roomId = '';
  points = [
    { point: 1, selected: false },
    { point: 2, selected: false },
    { point: 3, selected: false },
    { point: 5, selected: false },
    { point: 8, selected: false },
    { point: 13, selected: false },
    { point: 21, selected: false },
  ];
  votes: {
    point: number | null;
    name: string;
    flipped: boolean;
  }[] = [];
  isFlippedCards = false;
  user: IPlayer = { name: '', role: RoleEnum.PLAYER };
  subscriptions: Subscription[] = [];

  constructor(
    private planningService: PlanningService,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
    private router: Router,
    private toastr: ToastService,
    private roomService: RoomService
  ) {
    this.roomId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.getInfosUser();
    window.onbeforeunload = (event) => {
      this.leaveRoom();
    };
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
    this.leaveRoom();
  }

  ngOnInit(): void {
    this.listenerRoomActions();
    this.getVotes();
  }

  onSelectCard(point: number): void {
    if (this.isFlippedCards) {
      return;
    }
    const pointSel = this.points.find((el) => el.point === point);
    if (pointSel) {
      pointSel.selected = !pointSel.selected;
    }
    this.points.forEach((el) => {
      if (el.point !== point) {
        el.selected = false;
      }
    });
    const votesRoom: IVotesRoom = {
      nameUser: this.user.name,
      vote: pointSel?.selected ? point : null,
    }; /* , roomId: string */
    this.planningService.send(votesRoom, this.roomId);
  }

  async flipCards() {
    if (!this.isFlippedCards) {
      this.planningService.flipCards(this.roomId);
    } else {
      this.planningService.restartVotation(this.roomId);
    }
  }

  async goFlipCards(): Promise<void> {
    for (const item of this.votes) {
      await this.sleep();
      item.flipped = !item.flipped;
    }
    this.isFlippedCards = true;
  }

  async sleep(): Promise<void> {
    return new Promise((resolve) => {
      window.setTimeout(() => {
        resolve();
      }, 500);
    });
  }

  listenerRoomActions(): void {
    if (!this.user.name) {
      return;
    }
    this.subscriptions.push(
      this.planningService.listenerRoom(this.roomId).subscribe((result) => {
        if (result?.action === 'FLIP_CARDS') {
          this.goFlipCards();
        } else if (result?.action === 'VOTE') {
          this.voted(result.data);
        } else if (result.action === 'RESTART_VOTATION') {
          this.restartVotation();
        } else if (result.action === 'JOIN_ROOM') {
          this.userJoinRoom(result.data.player);
        } else if (result.action === 'USER_LEAVED') {
          //TESTAR
          this.userLeaved(result.data?.userName);
        }
      })
    );
  }

  getInfosUser(): void {
    const user = this.storageService.getItem(StorageEnum.USER);
    if (!user) {
      this.router.navigate([`/join-room/${this.roomId}`]);
      this.toastr.error({
        message: `Para continuar informe seus dados.`,
        override: {
          timeOut: 5000,
        },
      });
      return;
    }
    this.user = JSON.parse(user) as IPlayer;
    if (this.storageService.getItem(StorageEnum.JOINED_ROOM) === this.roomId) {
      //TESTAR
      return;
    }
    this.subscriptions.push(
      this.roomService.joinRoom(this.user, this.roomId).subscribe()
    );
    this.storageService.setItem(StorageEnum.JOINED_ROOM, this.roomId); //TESTAR
  }

  restartVotation(): void {
    this.votes = [];
    this.points.forEach((el) => (el.selected = false));
    this.isFlippedCards = false;
    this.toastr.info({ message: `O S.M reiniciou a votação.` });
  }

  voted(data: { nameUser: string; vote: number | null }): void {
    const vote = this.votes.find((el) => el.name === data.nameUser);
    if (vote && data.vote) {
      vote.point = data.vote;
    } else if (data.vote) {
      this.votes.push({
        name: data.nameUser,
        point: data.vote,
        flipped: false,
      });
    } else {
      this.votes = this.votes.filter((el) => el.name !== data.nameUser);
    }
  }

  userJoinRoom(player: IPlayer): void {
    /* add a list player */
    this.toastr.info({ message: `${player.name} entrou na sala.` });
  }

  getVotes(): void {
    this.subscriptions.push(
      this.planningService.getVotes(this.roomId).subscribe((result) => {
        if (!result.success) {
          return;
        }
        const votes = result.data.room?.votes.map((el) => {
          return {
            point: el.vote || null,
            name: el.nameUser,
            flipped: !!result.data.room?.blockVotes,
          };
        });
        if (votes?.length) {
          this.votes = votes;
          this.isFlippedCards = votes.some((el) => el.flipped);
        }
      })
    );
  }

  /* TESTAR */
  leaveRoom(): void {
    this.planningService.leaveRoom({
      roomId: this.roomId,
      userName: this.user.name,
    });
  }

  userLeaved(userName: string) {
    this.toastr.info({
      message: `${userName} saiu da sala.`,
      override: { timeOut: 5000 },
    });
  }
}
