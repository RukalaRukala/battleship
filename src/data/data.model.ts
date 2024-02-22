import WebSocket from 'ws';

export interface IExtendedWebSocket extends WebSocket {
  id: string;
}

export interface IUser {
  name: string;
  password: string;
  wins: number;
  socketId: string | null;
}

export interface IRoomUser {
  name: string;
  index: number;
}

export interface IRoom {
  roomId: string;
  roomUsers: IRoomUser[];
}

export interface IWinners {
  name: string;
  wins: number;
}

export interface IDataBase {
  users: IUser[];
  rooms: IRoom[];
  clients: IExtendedWebSocket[];
  winners: IWinners[];
}
