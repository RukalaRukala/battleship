import { TYPES_ENUM } from '../../interfaces/types.model';
import { IAttackFeedback } from './attack.model';
import { IGame, IPosition } from '../../data/data.model';
import { checkStatus } from './checkStatus';
import { chooseEmptyRandomCell } from './chooseEmptyRandomCell';

export function getAttackData(
  type: TYPES_ENUM,
  currentPlayer: IGame,
  enemy: IGame,
  position?: IPosition
): IAttackFeedback {
  const randPos: IPosition = chooseEmptyRandomCell(currentPlayer);
  const status = checkStatus(currentPlayer, enemy, randPos.x, randPos.y);

  const data: IAttackFeedback = {
    position: randPos,
    currentPlayer: currentPlayer.idPlayer,
    status: status,
  };

  if (type === TYPES_ENUM.ATTACK && position) {
    data.position.x = position.x;
    data.position.y = position.y;
    data.status = checkStatus(
      currentPlayer,
      enemy,
      data.position.x,
      data.position.y
    );
  }

  return data;
}
