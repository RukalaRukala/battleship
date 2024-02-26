import { IExtendedWebSocket } from '../../data/data.model';
import { viewRooms } from '../../utils/viewRooms.utils';
import { createNewRoom } from './createNewRoom';

export function roomHandling(ws: IExtendedWebSocket) {
  createNewRoom(ws);
  viewRooms();
}
