import { getRegResponse } from './getRegResponse';
import { IMessage } from '../message.model';
import { IExtendedWebSocket } from '../../data/data.model';
import { viewNewRoom } from '../../utils/viewNewRoom.utils';
import { getWinners } from '../../utils/getWinners.utils';

export function regHandling(ws: IExtendedWebSocket, request: IMessage) {
  const result = getRegResponse(ws, request);

  ws.send(result.response);

  if (!result.error) {
    getWinners();
    viewNewRoom();
  }
}
