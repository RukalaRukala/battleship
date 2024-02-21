import { dataBase } from '../../data/data';
import { TYPES_ENUM } from '../../interfaces/types.model';
import { IUserCredentials, IDataReg, IRegCheck } from './reg.model';
import { isExistedUser } from './isExistedUser';
import { IMessage } from '../message.model';

export function getRegResponse(request: IMessage): IRegCheck {
  const credentials: IUserCredentials = JSON.parse(request.data);
  const data: IDataReg = {
    name: credentials.name,
    index: 0,
    error: false,
  };
  const existedUser = dataBase.users.find((existedUser, index) =>
    isExistedUser(existedUser, credentials, data, index)
  );

  const response: IMessage = {
    type: TYPES_ENUM.REG,
    data: JSON.stringify(data),
    id: 0,
  };

  if (existedUser && existedUser.password === credentials.password) {
    return { error: false, response: response };
  } else {
    return {
      error: true,
      response: {
        ...response,
        data: JSON.stringify({
          ...data,
          error: true,
          errorText: 'Incorrect login or password',
        }),
      },
    };
  }
}
