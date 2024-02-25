import { IGameField } from './shipsHandling.model';
import { IShip } from '../../data/data.model';

export class GameField implements IGameField {
  cells: number[][];

  constructor() {
    this.cells = Array(10)
      .fill(0)
      .map(() => Array(10).fill(0));
  }

  initialize(ships: IShip[]) {
    for (const ship of ships) {
      const { position, direction, length } = ship;
      let { x, y } = position;
      for (let i = 0; i < length; i++) {
        this.cells[y][x] = 1;
        if (direction) y++;
        else x++;
      }
    }
  }

  checkHit(x: number, y: number) {
    return !!this.cells[y][x];
  }

  markHitCell(x: number, y: number) {
    this.cells[y][x] = 1;
  }
}
