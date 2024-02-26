import { IMessage } from '../message.model';
import { TYPES_ENUM } from '../../interfaces/types.model';

export function finishGame(id: number) {
  const winnerMessage: IMessage = {
    type: TYPES_ENUM.FINISH,
    data: JSON.stringify({ winPlayer: id }),
    id: 0,
  };
  return JSON.stringify(winnerMessage);
}
