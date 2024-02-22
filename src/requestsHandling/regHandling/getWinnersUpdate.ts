import { dataBase } from '../../data/data';
import { TYPES_ENUM } from '../../interfaces/types.model';

export function getWinnersUpdate() {
  return JSON.stringify({
    type: TYPES_ENUM.UPDATE_WINNERS,
    data: JSON.stringify(dataBase.winners),
    id: 0,
  });
}
