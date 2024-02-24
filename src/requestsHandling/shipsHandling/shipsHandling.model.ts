import { IShip } from '../../data/data.model';

export interface IUserGame {
  gameId: number;
  ships: IShip[];
  indexPlayer: number;
}
