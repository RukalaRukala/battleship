import { IPosition } from '../../data/data.model';

export enum ATTACK_STATUS {
  MISS = 'miss',
  KILLED = 'killed',
  SHOT = 'shot',
}

export interface IRandomAttack {
  gameId: number;
  indexPlayer: number;
}

export interface IAttack extends IRandomAttack {
  x: number;
  y: number;
}

export interface IAttackFeedback {
  position: IPosition;
  currentPlayer: number;
  status: ATTACK_STATUS;
}
