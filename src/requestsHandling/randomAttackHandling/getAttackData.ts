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
  if (type === TYPES_ENUM.ATTACK && position) {
    return {
      position: {
        x: position.x,
        y: position.y,
      },
      currentPlayer: currentPlayer.idPlayer,
      status: checkStatus(currentPlayer, enemy, position.x, position.y),
    };
  }

  console.log('preRandom');
  const randPos: IPosition = chooseEmptyRandomCell(currentPlayer);
  console.log('afterRandom');
  const status = checkStatus(currentPlayer, enemy, randPos.x, randPos.y);

  return {
    position: randPos,
    currentPlayer: currentPlayer.idPlayer,
    status: status,
  };
}
