import { dataBase } from '../../data/data';
import { IRoom, IRoomUser, IUser } from '../../data/data.model';

export function createRoom() {
  let userIndex: number = 0;
  const user = dataBase.users.find((user, i) => {
    if (user.active) {
      userIndex = i;
      return true;
    }
    return false;
  }) as IUser;

  const roomUser: IRoomUser = { name: user.name, index: userIndex };
  const lastRoom = dataBase.rooms.at(-1);
  const roomId = lastRoom ? lastRoom.roomId + 1 : 0;
  const newRoom: IRoom = {
    roomId: roomId,
    roomUsers: [roomUser],
  };

  !dataBase.rooms.find(room =>
    room.roomUsers.find(roomUser => userIndex === roomUser.index)
  )
    ? dataBase.rooms.push(newRoom)
    : null;
}
