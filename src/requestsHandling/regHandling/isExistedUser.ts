import { IDataReg, IUserCredentials } from './reg.model';
import { IExtendedWebSocket, IUser } from '../../data/data.model';

export function isExistedUser(
  ws: IExtendedWebSocket,
  existedUser: IUser,
  credentials: IUserCredentials,
  data: IDataReg,
  index: number
) {
  if (existedUser.name === credentials.name) {
    data.index = index;
    existedUser.socketId = ws.id;
    return true;
  }
  return false;
}
