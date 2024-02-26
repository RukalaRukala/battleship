import { IRoom } from '../../data/data.model';
import { dataBase } from '../../data/data';

export function hideRoomWithTwoUsersUtils(chosenRoom?: IRoom) {
  dataBase.rooms = dataBase.rooms.filter(
    room => room.roomId !== chosenRoom?.roomId
  );
}
