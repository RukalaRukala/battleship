import { IGame } from '../../data/data.model';
import { ATTACK_STATUS } from './attack.model';

export function checkStatus(
  currentPlayer: IGame,
  enemy: IGame,
  x: number,
  y: number
): ATTACK_STATUS {
  currentPlayer.enemyBoard?.markHitCell(x, y);
  currentPlayer.enemyBoard?.cells.forEach(line =>
    console.log(JSON.stringify(line))
  );
  return !!enemy.ships?.checkHit(x, y)
    ? ATTACK_STATUS.SHOT
    : ATTACK_STATUS.MISS;
}
