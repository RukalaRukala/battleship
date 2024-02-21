import { TYPES_ENUM } from '../../interfaces/types.model';
import { IMessage } from '../message.model';

export function createRoomHandling(): IMessage {
  return {
    type: TYPES_ENUM.CREATE_ROOM,
    data: '',
    id: 0,
  };
}
