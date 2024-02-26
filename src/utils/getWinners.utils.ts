import { createMessage } from './createMessage.utils';
import { TYPES_ENUM } from '../interfaces/types.model';
import { dataBase } from '../data/data';
import { IExtendedWebSocket } from '../data/data.model';

export function getWinners(ws?: IExtendedWebSocket) {
  const winners = createMessage(TYPES_ENUM.UPDATE_WINNERS, dataBase.winners);
  if (ws) {
    ws.send(winners);
    return;
  }
  dataBase.clients.forEach(client => {
    client.send(winners);
  });
}
