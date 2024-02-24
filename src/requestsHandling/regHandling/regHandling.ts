import { getRegResponse } from './getRegResponse';
import { IMessage } from '../message.model';
import { dataBase } from '../../data/data';
import { IExtendedWebSocket } from '../../data/data.model';
import { getRoomsUpdate } from '../roomHandling/getRoomsUpdate';
import { getWinnersUpdate } from './getWinnersUpdate';

export function regHandling(ws: IExtendedWebSocket, request: IMessage) {
  const result = getRegResponse(ws, request);

  ws.send(result.response);

  if (!result.error) {
    dataBase.clients.forEach(client => {
      client.send(getRoomsUpdate());
    });

    dataBase.clients.forEach(client => {
      client.send(getWinnersUpdate());
    });
  }
}
