import { dataBase } from '../../data/data';
import { getRoomsUpdate } from './getRoomsUpdate';

export function viewNewRoom() {
  dataBase.clients.forEach(client => {
    client.send(getRoomsUpdate());
  });
}
