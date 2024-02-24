import { ICurrentPlayer, IExtendedWebSocket } from '../../data/data.model';
import { IMessage } from '../message.model';
import { TYPES_ENUM } from '../../interfaces/types.model';
import { IUserGame } from './shipsHandling.model';
import { createMessage } from '../../utils/createMessage';

export function shipsHandling(ws: IExtendedWebSocket, request: IMessage) {
  const game: IUserGame = JSON.parse(request.data);
  const currentPlayer: ICurrentPlayer = { currentPlayer: game.indexPlayer };
  const shipsMessage = createMessage(TYPES_ENUM.START_GAME, game.ships);
  const turnMessage = createMessage(TYPES_ENUM.TURN, currentPlayer);

  ws.send(shipsMessage);
  ws.send(turnMessage);
}
