import { IExtendedWebSocket, IGame } from '../../data/data.model';
import { IMessage } from '../message.model';
import { createId } from '../../utils/createId.utils';
import { GameField } from '../shipsHandling/gameField';
import { createMessage } from '../../utils/createMessage.utils';
import { TYPES_ENUM } from '../../interfaces/types.model';
import { IGameField } from '../shipsHandling/shipsHandling.model';
import { dataBase } from '../../data/data';

export function singlePlayHandling(ws: IExtendedWebSocket, request: IMessage) {
  const gameId = createId();
  const roomId = createId();
  const botGame: IGame = {
    idGame: gameId,
    idPlayer: 99999,
    ships: new GameField(),
    enemyBoard: new GameField(),
    turn: false,
  };
  (botGame.ships as IGameField).cells = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  ];

  const myGame: IGame = {
    idGame: gameId,
    idPlayer: ws.id,
    ships: new GameField(),
    enemyBoard: new GameField(),
    turn: false,
  };

  dataBase.activeGames.push({ id: gameId, games: [myGame, botGame] });

  const myGameMessage = createMessage(TYPES_ENUM.CREATE_GAME, {
    idGame: gameId,
    idPlayer: ws.id,
  });

  const botGameMessage = createMessage(TYPES_ENUM.CREATE_GAME, {
    idGame: gameId,
    idPlayer: botGame.idPlayer,
  });

  ws.send(createMessage(TYPES_ENUM.ADD_USER_TO_ROOM, { indexRoom: gameId }));

  ws.send(botGameMessage);
  ws.send(myGameMessage);
}
