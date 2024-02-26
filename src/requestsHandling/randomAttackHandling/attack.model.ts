import { IPosition } from '../../data/data.model';

export enum ATTACK_STATUS {
  MISS = 'miss',
  KILLED = 'killed',
  SHOT = 'shot',
}

export interface IAttack {
  gameId: number;
  indexPlayer: number;
  x?: number;
  y?: number;
}

export interface IAttackFeedback {
  position: IPosition;
  currentPlayer: number;
  status: ATTACK_STATUS;
}
