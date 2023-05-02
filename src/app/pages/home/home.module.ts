import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardHomeModule } from 'src/app/components/card-home/card-home.module';
import HomeRoutingModule from './home-routing.module';
import { HomeComponent } from './home.component';
import { JoinRoomComponent } from './join-room/join-room.component';
import { NewRoomComponent } from './new-room/new-room.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  imports: [CommonModule, FormsModule, HomeRoutingModule, CardHomeModule],
  declarations: [
    HomeComponent,
    NewRoomComponent,
    JoinRoomComponent,
    WelcomeComponent,
  ],
  providers: [],
})
export class HomeModule {}
