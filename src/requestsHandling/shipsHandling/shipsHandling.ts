import {
  IActiveGame,
  ICurrentPlayer,
  IExtendedWebSocket,
} from '../../data/data.model';
import { IMessage } from '../message.model';
import { TYPES_ENUM } from '../../interfaces/types.model';
import { IUserGame } from './shipsHandling.model';
import { createMessage } from '../../utils/createMessage.utils';
import { getActiveGame } from '../../utils/getActiveGame.utils';

export function shipsHandling(ws: IExtendedWebSocket, request: IMessage) {
  const game: IUserGame = JSON.parse(request.data);
  const activeGame: IActiveGame = getActiveGame(game.gameId);
  const gameUsersId: number[] = activeGame.games.map(game => game.idPlayer);
  const playerWhoseTurnItIs: ICurrentPlayer = { currentPlayer: gameUsersId[0] };

  const shipsMessage = createMessage(TYPES_ENUM.START_GAME, game.ships);
  const turnMessage = createMessage(TYPES_ENUM.TURN, playerWhoseTurnItIs);

  ws.send(shipsMessage);
  ws.send(turnMessage);
}
