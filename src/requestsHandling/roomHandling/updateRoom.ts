import { IMessage } from '../message.model';
import { TYPES_ENUM } from '../../interfaces/types.model';
import { dataBase } from '../../data/data';
import { createRoom } from './createRoom';

export function updateRoom(): IMessage {
  createRoom();
  return {
    type: TYPES_ENUM.UPDATE_ROOM,
    data: JSON.stringify(dataBase.rooms),
    id: 0,
  };
}
