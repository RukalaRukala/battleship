import WebSocket from 'ws';
import { TYPES_ENUM } from '../interfaces/types.model';
import { regHandling } from '../requestsHandling/regHandling/regHandling';
import { IMessage } from '../requestsHandling/message.model';
import { createRoomHandling } from '../requestsHandling/roomHandling/createRoomHandling';
import { dataBase } from '../data/data';
import { IExtendedWebSocket } from '../data/data.model';
import { addUserHandling } from '../requestsHandling/addUserHandling/addUserHandling';
import { createId } from '../utils/createId.utils';

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
          console.log(dataBase);
          break;

        case TYPES_ENUM.CREATE_ROOM:
          createRoomHandling(ws);
          break;

        case TYPES_ENUM.ADD_USER_TO_ROOM:
          addUserHandling(ws);
          break;
      }
      console.log('Received message:', request);
    });
  });
}
