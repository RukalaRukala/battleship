import { createMessage } from './createMessage.utils';
import { TYPES_ENUM } from '../interfaces/types.model';
import { dataBase } from '../data/data';

export function getWinners() {
  const winners = createMessage(TYPES_ENUM.UPDATE_WINNERS, dataBase.winners);
  dataBase.clients.forEach(client => {
    client.send(winners);
  });
}
