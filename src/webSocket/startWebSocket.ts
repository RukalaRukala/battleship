import WebSocket from 'ws';
import { TYPES_ENUM } from '../interfaces/types.model';
import { regHandling } from '../requestsHandling/regHandling/regHandling';
import { IMessage } from '../requestsHandling/message.model';
import { updateRoom } from '../requestsHandling/roomHandling/updateRoom';

const wss = new WebSocket.Server({
  port: +(process.env.WS_PORT || '3000'),
});

export function startWebSocket() {
  wss.on('connection', ws => {
    console.log('Client connected');

    ws.on('message', message => {
      const request: IMessage = JSON.parse(message.toString());
      switch (request.type) {
        case TYPES_ENUM.REG:
          regHandling(ws, request);
          break;
        case TYPES_ENUM.CREATE_ROOM:
          ws.send(JSON.stringify(updateRoom()));
          break;
      }
      console.log('Received message:', request);
    });
  });
}
