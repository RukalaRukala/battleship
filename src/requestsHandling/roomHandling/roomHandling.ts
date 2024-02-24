import { IExtendedWebSocket } from '../../data/data.model';
import { viewNewRoom } from '../../utils/viewNewRoom.utils';
import { createNewRoom } from './createNewRoom';

export function roomHandling(ws: IExtendedWebSocket) {
  createNewRoom(ws);
  viewNewRoom();
}
