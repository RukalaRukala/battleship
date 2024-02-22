import WebSocket from 'ws';

export interface IExtendedWebSocket extends WebSocket {
  id: number;
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
}

export interface IDataBase {
  users: IUser[];
  rooms: IRoom[];
  clients: IExtendedWebSocket[];
  games: IGame[];
  winners: IWinners[];
}
