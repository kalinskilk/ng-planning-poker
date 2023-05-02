import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { JoinRoomComponent } from './join-room/join-room.component';
import { NewRoomComponent } from './new-room/new-room.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: WelcomeComponent },
      { path: 'new-room', component: NewRoomComponent },
      { path: 'join-room', component: JoinRoomComponent },
      { path: 'join-room/:id', component: JoinRoomComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class HomeRoutingModule {}
