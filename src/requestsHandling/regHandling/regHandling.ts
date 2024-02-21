import WebSocket from 'ws';
import { getRegResponse } from './getRegResponse';
import { updateWinners } from './updateWinners';
import { IMessage } from '../message.model';
import { TYPES_ENUM } from '../../interfaces/types.model';

export function regHandling(ws: WebSocket, request: IMessage) {
  const result = getRegResponse(request);
  const roomsInit = JSON.stringify({
    type: TYPES_ENUM.CREATE_ROOM,
    data: '',
    id: 0,
  });
  ws.send(JSON.stringify(result.response));
  !result.error
    ? (() => {
        ws.send(JSON.stringify(updateWinners(result.response)));
        ws.send(roomsInit);
      })()
    : null;
}
