import { TYPES_ENUM } from '../interfaces/types.model';

export interface IMessage {
  type: TYPES_ENUM;
  data: string;
  id: number;
}
