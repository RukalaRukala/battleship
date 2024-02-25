import { TYPES_ENUM } from '../../interfaces/types.model';
import { ATTACK_STATUS, IAttackFeedback } from './attack.model';
import { IPosition } from '../../data/data.model';

export function getAttackData(
  type: TYPES_ENUM,
  id: number,
  position?: IPosition
): IAttackFeedback {
  const attackData: IAttackFeedback = {
    position: {
      x: Math.floor(Math.random() * 10),
      y: Math.floor(Math.random() * 10),
    },
    currentPlayer: id,
    status: ATTACK_STATUS.MISS,
  };

  if (type === TYPES_ENUM.ATTACK && position) {
    attackData.position.x = position.x;
    attackData.position.y = position.y;
  }

  return attackData;
}
