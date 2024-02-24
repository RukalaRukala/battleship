import { IMessage } from '../message.model';
import { IExtendedWebSocket, IRoom, IUser } from '../../data/data.model';
import { dataBase } from '../../data/data';
import { IIndexRoom } from './addUserHandlind.model';
import { addInitUserToTheRoom } from './addInitUserToTheRoom';
import { hideRoomWithTwoUsersUtils } from './hideRoomWithTwoUsers';
import { createActiveGame } from './createActiveGame';

export function createGameForUsers(ws: IExtendedWebSocket, request: IMessage) {
  const requestData: IIndexRoom = JSON.parse(request.data);
  const chosenRoom = dataBase.rooms.find(
    room => room.roomId === requestData.indexRoom
  ) as IRoom;

  const initGameUser = dataBase.users.find(
    user => user.socketId === ws.id
  ) as IUser;

  console.log(chosenRoom.roomUsers[0]);
  console.log(dataBase.users);

  const roomOwnerUser = dataBase.users.find(
    user => user.socketId === chosenRoom.roomUsers[0].index
  ) as IUser;

  addInitUserToTheRoom(chosenRoom, initGameUser, ws);

  hideRoomWithTwoUsersUtils(chosenRoom);

  return createActiveGame(initGameUser, roomOwnerUser);
}
