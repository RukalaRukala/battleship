export interface IUser {
  name: string;
  password: string;
  wins: number;
}

export interface IDataBase {
  users: IUser[];
}
