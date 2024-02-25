import { IGame, IPosition } from '../../data/data.model';

export function chooseEmptyRandomCell(currentPlayer: IGame) {
  let x = Math.floor(Math.random() * 10);
  let y = Math.floor(Math.random() * 10);
  const isCellMarked = !!currentPlayer.enemyBoard?.cells[y][x];

  while (isCellMarked) {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
  }
  const position: IPosition = { x: x, y: y };

  return position;
}
