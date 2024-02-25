import WebSocket from 'ws';
import { IDataReg } from '../requestsHandling/regHandling/reg.model';
import { IAttack } from '../requestsHandling/randomAttackHandling/attack.model';
import { IGameField } from '../requestsHandling/shipsHandling/shipsHandling.model';

export enum SHIP_SIZE {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  HUGE = 'huge',
}

export interface IExtendedWebSocket extends WebSocket {
  id: number;
}

export interface IPosition {
  x: number;
  y: number;
}

export interface IShip {
  position: IPosition;
  direction: boolean;
  length: number;
  type: SHIP_SIZE;
}

export interface IUser {
  name: string;
  password: string;
  wins: number;
  socketId: number | null;
}

export interface IRoomUser {
  name: string;
  index: number;
}

export interface IRoom {
  roomId: number;
  roomUsers: IRoomUser[];
}

export interface IWinners {
  name: string;
  wins: number;
}

export interface IGame {
  idGame: number;
  idPlayer: number;
  enemyBoard?: IGameField;
  ships?: IGameField;
}

export interface IActiveGame {
  id: number;
  games: IGame[];
}

export interface IDataBase {
  users: IUser[];
  rooms: IRoom[];
  clients: IExtendedWebSocket[];
  winners: IWinners[];
  activeGames: IActiveGame[];
}

export interface ICurrentPlayer {
  currentPlayer: number;
}

export type DATA =
  | IDataReg
  | IShip[]
  | ICurrentPlayer
  | IGame
  | IWinners[]
  | IRoom[]
  | IAttack;
