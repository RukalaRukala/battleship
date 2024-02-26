import { TYPES_ENUM } from '../interfaces/types.model';
import { DATA } from '../data/data.model';

export function createMessage(type: TYPES_ENUM, data: DATA) {
  return JSON.stringify({
    type: type,
    data: JSON.stringify(data),
    id: 0,
  });
}
