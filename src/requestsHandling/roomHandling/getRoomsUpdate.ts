import { TYPES_ENUM } from '../../interfaces/types.model';
import { dataBase } from '../../data/data';

export function getRoomsUpdate() {
  return JSON.stringify({
    type: TYPES_ENUM.UPDATE_ROOM,
    data: JSON.stringify(dataBase.rooms),
    id: 0,
  });
}
