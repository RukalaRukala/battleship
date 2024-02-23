import { IRoom, IRoomUser, IUser } from '../../data/data.model';
import { dataBase } from '../../data/data';

export function addUserToTheRoom(
  chosenRoom: IRoom | undefined,
  initiatingUser: IUser | undefined
) {
  if (
    chosenRoom &&
    initiatingUser &&
    chosenRoom.roomUsers[0].index !== initiatingUser.socketId
  ) {
    const userToRoom: IRoomUser = {
      name: initiatingUser.name,
      index: initiatingUser.socketId ? initiatingUser.socketId : 0,
    };
    chosenRoom.roomUsers.push(userToRoom);

    const initiatingUserRoom = dataBase.rooms.find(
      room => room.roomUsers[0].index === initiatingUser.socketId
    );

    if (initiatingUserRoom) {
      dataBase.rooms = dataBase.rooms.filter(
        room => room.roomId !== initiatingUserRoom.roomId
      );
    }
  }
}
