import { IMessage } from '../message.model';

export interface IUserCredentials {
  name: string;
  password: string;
}

export interface IDataReg {
  name: string;
  index: number;
  error: boolean;
  errorText?: string;
}

export interface IRegCheck {
  error: boolean;
  response: IMessage;
}

export interface IUserWinners {
  name: string;
  wins: number;
}
