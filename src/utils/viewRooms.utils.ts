import { dataBase } from '../data/data';
import { createMessage } from './createMessage.utils';
import { TYPES_ENUM } from '../interfaces/types.model';
import { IExtendedWebSocket } from '../data/data.model';

export function viewRooms(ws?: IExtendedWebSocket) {
  const rooms = createMessage(TYPES_ENUM.UPDATE_ROOM, dataBase.rooms);
  if (ws) {
    ws.send(rooms);
  }

  dataBase.clients.forEach(client => {
    client.send(rooms);
  });
}
