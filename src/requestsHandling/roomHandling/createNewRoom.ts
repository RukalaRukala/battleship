import { dataBase } from '../../data/data';
import { IExtendedWebSocket, IRoom } from '../../data/data.model';
import { createId } from '../../utils/createId.utils';

export function createNewRoom(ws: IExtendedWebSocket) {
  dataBase.users.forEach(user => {
    if (user.socketId === ws.id) {
      const newRoom: IRoom = {
        roomId: createId(),
        roomUsers: [{ name: user.name, index: user.socketId }],
      };
      const isNotUserInTheRoom = !dataBase.rooms.find(room =>
        room.roomUsers.find(roomUser => roomUser.index === user.socketId)
      );

      if (isNotUserInTheRoom) {
        dataBase.rooms.push(newRoom);
      }
    }
  });
}
