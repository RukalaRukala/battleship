import {
  IActiveGame,
  ICurrentPlayer,
  IExtendedWebSocket,
  IGame,
} from '../../data/data.model';
import { IMessage } from '../message.model';
import { TYPES_ENUM } from '../../interfaces/types.model';
import { IUserGame } from './shipsHandling.model';
import { createMessage } from '../../utils/createMessage.utils';
import { getActiveGame } from '../../utils/getActiveGame.utils';
import { GameField } from './gameField';

export function shipsHandling(ws: IExtendedWebSocket, request: IMessage) {
  const gameData: IUserGame = JSON.parse(request.data);
  const activeGame: IActiveGame = getActiveGame(gameData.gameId);
  const gameUsersId: number[] = activeGame.games.map(game => game.idPlayer);
  const userGame = activeGame.games.find(
    game => game.idPlayer === gameData.indexPlayer
  ) as IGame;

  userGame.ships = new GameField();
  userGame.enemyBoard = new GameField();
  userGame.ships.initialize(gameData.ships);
  userGame.ships.cells.forEach(line => console.log(JSON.stringify(line)));

  const playerWhoseTurnItIs: ICurrentPlayer = { currentPlayer: gameUsersId[0] };

  const shipsMessage = createMessage(TYPES_ENUM.START_GAME, gameData.ships);
  const turnMessage = createMessage(TYPES_ENUM.TURN, playerWhoseTurnItIs);

  ws.send(shipsMessage);
  ws.send(turnMessage);
}
