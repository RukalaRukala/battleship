import {
  IExtendedWebSocket,
  IRoom,
  IRoomUser,
  IUser,
} from '../../data/data.model';
import { dataBase } from '../../data/data';

export function addInitUserToTheRoom(
  chosenRoom: IRoom,
  initiatingUser: IUser,
  ws: IExtendedWebSocket
) {
  if (chosenRoom.roomUsers[0].index !== initiatingUser.socketId) {
    const userToRoom: IRoomUser = {
      name: initiatingUser.name,
      index: ws.id,
    };
    chosenRoom.roomUsers.push(userToRoom);

    const initUserRoom = dataBase.rooms.find(
      room => room.roomUsers[0].index === initiatingUser.socketId
    );

    if (initUserRoom) {
      dataBase.rooms = dataBase.rooms.filter(
        room => room.roomId !== initUserRoom.roomId
      );
    }
  }
}
