/* import { IPlayer } from "./player";

export interface IVoteDataRoom{
  nameUser: string;
    vote: number;
} */

export interface IDataRoom {
  roomId: string;
  action: 'FLIP_CARDS' | 'VOTE' | 'RESTART_VOTATION' | 'JOIN_ROOM';
  data?: any; // TODO ADD TYPE
}
