import { TYPES_ENUM } from '../../interfaces/types.model';

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

export interface IReg {
  type: TYPES_ENUM;
  data: string;
  id: number;
}
