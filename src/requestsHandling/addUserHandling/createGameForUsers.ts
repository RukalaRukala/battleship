import { IExtendedWebSocket, IRoom, IUser } from '../../data/data.model';
import { dataBase } from '../../data/data';
import { addInitUserToTheRoom } from './addInitUserToTheRoom';
import { hideRoomWithTwoUsersUtils } from './hideRoomWithTwoUsers';
import { createActiveGame } from './createActiveGame';

export function createGameForUsers(ws: IExtendedWebSocket, chosenRoom: IRoom) {
  const initGameUser = dataBase.users.find(
    user => user.socketId === ws.id
  ) as IUser;

  const roomOwnerUser = dataBase.users.find(
    user => user.socketId === chosenRoom.roomUsers[0].index
  ) as IUser;

  addInitUserToTheRoom(chosenRoom, initGameUser, ws);

  hideRoomWithTwoUsersUtils(chosenRoom);

  return createActiveGame(initGameUser, roomOwnerUser);
}
