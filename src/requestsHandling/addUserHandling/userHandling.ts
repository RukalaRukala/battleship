import { IExtendedWebSocket, IRoom } from '../../data/data.model';
import { createGameForUsers } from './createGameForUsers';
import { IMessage } from '../message.model';
import { dataBase } from '../../data/data';
import { TYPES_ENUM } from '../../interfaces/types.model';
import { createMessage } from '../../utils/createMessage.utils';
import { getActiveGame } from '../../utils/getActiveGame.utils';
import { IIndexRoom } from './addUserHandlind.model';

export function userHandling(ws: IExtendedWebSocket, request: IMessage) {
  const requestData: IIndexRoom = JSON.parse(request.data);

  const chosenRoom = dataBase.rooms.find(
    room => room.roomId === requestData.indexRoom
  ) as IRoom;

  if (ws.id !== chosenRoom.ownerId) {
    const activeGameId = createGameForUsers(ws, chosenRoom);
    const activeGame = getActiveGame(activeGameId);

    activeGame.games.forEach(game => {
      const ws = dataBase.clients.find(
        client => client.id === game.idPlayer
      ) as IExtendedWebSocket;

      const message = createMessage(TYPES_ENUM.CREATE_GAME, game);

      ws.send(message);
    });
  }
}
