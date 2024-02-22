import { dataBase } from '../../data/data';
import { IExtendedWebSocket, IRoom } from '../../data/data.model';
import { randomUUID } from 'crypto';

export function createRoom(ws: IExtendedWebSocket) {
  dataBase.users.forEach((user, i) => {
    console.log(user);
    if (user.socketId === ws.id) {
      const newRoom: IRoom = {
        roomId: randomUUID(),
        roomUsers: [{ name: user.name, index: i }],
      };
      const isNotUserInTheRoom = !dataBase.rooms.find(room =>
        room.roomUsers.find(roomUser => roomUser.index === i)
      );

      if (isNotUserInTheRoom) {
        dataBase.rooms.push(newRoom);
      }
    }
  });
}
