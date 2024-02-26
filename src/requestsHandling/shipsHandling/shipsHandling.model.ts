import { IShip } from '../../data/data.model';

export interface IUserGame {
  gameId: number;
  ships: IShip[];
  indexPlayer: number;
}

export interface IGameField {
  cells: number[][];
  initialize(ships: IShip[]): void;
  checkHit(x: number, y: number): boolean;
  markHitCell(x: number, y: number): void;
  getShots(): number;
}
