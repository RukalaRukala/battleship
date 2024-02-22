import { dataBase } from '../../data/data';
import { createRoom } from './createRoom';
import { IExtendedWebSocket } from '../../data/data.model';
import { getRoomsUpdate } from './getRoomsUpdate';

export function createRoomHandling(ws: IExtendedWebSocket) {
  createRoom(ws);

  dataBase.clients.forEach(client => {
    client.send(getRoomsUpdate());
  });
}
