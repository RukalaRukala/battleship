import { dataBase } from '../data/data';
import { createMessage } from './createMessage';
import { TYPES_ENUM } from '../interfaces/types.model';

export function viewNewRoom() {
  const rooms = createMessage(TYPES_ENUM.UPDATE_ROOM, dataBase.rooms);
  dataBase.clients.forEach(client => {
    client.send(rooms);
  });
}
