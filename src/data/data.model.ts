interface IUser {
  name: string;
  password: string;
}

export interface IDataBase {
  users: IUser[];
}
