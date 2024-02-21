import WebSocket from 'ws';
import { getRegResponse } from './getRegResponse';
import { updateWinners } from './updateWinners';
import { createRoomHandling } from '../roomHandling/createRoomHandling';
import { IMessage } from '../message.model';

export function regHandling(ws: WebSocket, request: IMessage) {
  const result = getRegResponse(request);
  ws.send(JSON.stringify(result.response));
  !result.error
    ? (() => {
        ws.send(JSON.stringify(updateWinners(result.response)));
        ws.send(JSON.stringify(createRoomHandling()));
      })()
    : null;
}
