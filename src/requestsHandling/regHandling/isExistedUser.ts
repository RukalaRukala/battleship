import { IDataReg, IUserCredentials } from './reg.model';
import { IUser } from '../../data/data.model';

export function isExistedUser(
  existedUser: IUser,
  credentials: IUserCredentials,
  data: IDataReg,
  index: number
) {
  if (existedUser.name === credentials.name) {
    data.index = index;
    existedUser.active = true;
    return true;
  } else {
    return false;
  }
}
