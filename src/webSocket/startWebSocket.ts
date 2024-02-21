import WebSocket from 'ws';
import { TYPES_ENUM } from '../interfaces/types.model';
import { regHandling } from '../requestsHandling/regHandling/regHandling';
// import { createRoomHandling } from '../requestsHandling/createRoomHandling';
import { IReg } from '../requestsHandling/regHandling/reg.model';
import { updateWinners } from '../requestsHandling/regHandling/updateWinners';

const wss = new WebSocket.Server({
  port: +(process.env.WS_PORT || '3000'),
});

export function startWebSocket() {
  wss.on('connection', ws => {
    console.log('Client connected');

    ws.on('message', message => {
      const request: IReg = JSON.parse(message.toString());
      switch (request.type) {
        case TYPES_ENUM.REG:
          const result = regHandling(request);
          ws.send(JSON.stringify(result.response));
          !result.error
            ? ws.send(JSON.stringify(updateWinners(result.response)))
            : null;
          break;

        case TYPES_ENUM.CREATE_ROOM:
          // ws.send(JSON.stringify(createRoomHandling(request)));
          break;
      }
      console.log('Received message:', request);
    });
  });
}
