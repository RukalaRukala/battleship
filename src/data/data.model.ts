export interface IUser {
  name: string;
  password: string;
  wins: number;
  active: boolean;
}

export interface IRoomUser {
  name: string;
  index: number;
}

export interface IRoom {
  roomId: number;
  roomUsers: IRoomUser[];
}

export interface IDataBase {
  users: IUser[];
  rooms: IRoom[];
}
