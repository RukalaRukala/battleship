import { IExtendedWebSocket } from '../../data/data.model';
import { IMessage } from '../message.model';
import { TYPES_ENUM } from '../../interfaces/types.model';
import { IUserGame } from './shipsHandling.model';

export function shipsHandling(ws: IExtendedWebSocket, request: IMessage) {
  const game: IUserGame = JSON.parse(request.data);

  const shipsMessage: IMessage = {
    type: TYPES_ENUM.START_GAME,
    data: JSON.stringify(game.ships),
    id: 0,
  };

  const turnMessage: IMessage = {
    type: TYPES_ENUM.TURN,
    data: JSON.stringify({
      currentPlayer: game.indexPlayer,
    }),
    id: 0,
  };

  ws.send(JSON.stringify(shipsMessage));
  ws.send(JSON.stringify(turnMessage));
}
