import WebSocket from 'ws';
import { TYPES_ENUM } from '../interfaces/types.model';
import { regHandling } from '../requestsHandling/regHandling/regHandling';
import { IMessage } from '../requestsHandling/message.model';
import { roomHandling } from '../requestsHandling/roomHandling/roomHandling';
import { dataBase } from '../data/data';
import { IExtendedWebSocket } from '../data/data.model';
import { userHandling } from '../requestsHandling/addUserHandling/userHandling';
import { createId } from '../utils/createId.utils';
import { shipsHandling } from '../requestsHandling/shipsHandling/shipsHandling';
import { randomAttackHandling } from '../requestsHandling/randomAttackHandling/randomAttackHandling';

const wss = new WebSocket.Server({
  port: +(process.env.WS_PORT || '3000'),
});

export function startWebSocket() {
  wss.on('connection', socket => {
    console.log('Client connected');

    const ws: IExtendedWebSocket = socket as IExtendedWebSocket;
    ws.id = createId();
    dataBase.clients.push(ws);

    ws.on('message', message => {
      const request: IMessage = JSON.parse(message.toString());

      switch (request.type) {
        case TYPES_ENUM.REG:
          regHandling(ws, request);
          break;

        case TYPES_ENUM.CREATE_ROOM:
          roomHandling(ws);
          break;

        case TYPES_ENUM.ADD_USER_TO_ROOM:
          userHandling(ws, request);
          break;

        case TYPES_ENUM.ADD_SHIPS:
          shipsHandling(ws, request);
          break;

        case TYPES_ENUM.RANDOM_ATTACK:
          randomAttackHandling(request);
          break;

        case TYPES_ENUM.ATTACK:
          randomAttackHandling(request);
          break;
      }
      console.log('Received message:', request);
    });
  });
}
