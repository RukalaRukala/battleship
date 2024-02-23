import WebSocket from 'ws';

export enum SHIP_SIZE {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  HUGE = 'huge',
}

export enum DIRECTION {
  VERTICAL = 'true',
  HORIZONTAL = '',
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
  direction: DIRECTION;
  length: number;
  type: SHIP_SIZE;
}

export interface IUserGame {
  gameId: number;
  ships: IShip[];
  indexPlayer: number;
}

export interface IUser {
  name: string;
  password: string;
  wins: number;
  socketId: number | null;
  game: IUserGame | null;
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
}

export interface IDataBase {
  users: IUser[];
  rooms: IRoom[];
  clients: IExtendedWebSocket[];
  games: IGame[];
  winners: IWinners[];
}
