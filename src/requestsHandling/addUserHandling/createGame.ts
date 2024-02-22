import { IMessage } from '../message.model';
import { IExtendedWebSocket, IGame } from '../../data/data.model';
import { createId } from '../../utils/createId.utils';
import { TYPES_ENUM } from '../../interfaces/types.model';
import { dataBase } from '../../data/data';

export function createGame(ws: IExtendedWebSocket) {
  const newGame: IGame = {
    idGame: createId(),
    idPlayer: ws.id,
  };

  const gameMessage: IMessage = {
    type: TYPES_ENUM.CREATE_GAME,
    data: JSON.stringify(newGame),
    id: 0,
  };

  dataBase.games.push(newGame);

  return JSON.stringify(gameMessage);
}
