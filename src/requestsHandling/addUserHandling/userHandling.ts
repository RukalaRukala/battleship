import { IExtendedWebSocket } from '../../data/data.model';
import { createGameForUsers } from './createGameForUsers';
import { IMessage } from '../message.model';
import { dataBase } from '../../data/data';
import { TYPES_ENUM } from '../../interfaces/types.model';
import { createMessage } from '../../utils/createMessage.utils';
import { getActiveGame } from '../../utils/getActiveGame.utils';

export function userHandling(ws: IExtendedWebSocket, request: IMessage) {
  const activeGameId = createGameForUsers(ws, request);
  const activeGame = getActiveGame(activeGameId);

  activeGame.games.forEach(game => {
    const ws = dataBase.clients.find(
      client => client.id === game.idPlayer
    ) as IExtendedWebSocket;

    const message = createMessage(TYPES_ENUM.CREATE_GAME, game);

    ws.send(message);
  });
}
