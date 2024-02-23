import { IMessage } from '../message.model';
import { IExtendedWebSocket, IGame } from '../../data/data.model';
import { createId } from '../../utils/createId.utils';
import { TYPES_ENUM } from '../../interfaces/types.model';
import { dataBase } from '../../data/data';
import { IIndexRoom } from './addUserHandlind.model';
import { addUserToTheRoom } from './addUserToTheRoom';
import { deleteRoomWithTwoUsersFromTheRooms } from '../../utils/deleteRoomWithTwoUsersFromTheRooms';

export function createGame(ws: IExtendedWebSocket, request: IMessage) {
  const requestData: IIndexRoom = JSON.parse(request.data);
  const chosenRoom = dataBase.rooms.find(
    room => room.roomId === requestData.indexRoom
  );
  const initiatingUser = dataBase.users.find(user => user.socketId === ws.id);

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
  addUserToTheRoom(chosenRoom, initiatingUser);

  deleteRoomWithTwoUsersFromTheRooms(chosenRoom);

  return JSON.stringify(gameMessage);
}
