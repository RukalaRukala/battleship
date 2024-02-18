import { dataBase } from '../../data/data';
import { TYPES_ENUM } from '../../interfaces/types.model';
import { IUserCredentials, IDataReg, IReg } from './reg.model';

export function regHandling(request: IReg): IReg {
  const user: IUserCredentials = JSON.parse(request.data);
  const existedUser = dataBase.users.find(
    existedUser => existedUser.name === user.name
  );

  const data: IDataReg = {
    name: user.name,
    index: Math.floor(Math.random() * 100) + 1,
    error: false,
  };

  const response: IReg = {
    type: TYPES_ENUM.REG,
    data: JSON.stringify(data),
    id: 0,
  };

  if (existedUser && existedUser.password === user.password) {
    return response;
  } else {
    return {
      ...response,
      data: JSON.stringify({
        ...data,
        error: true,
        errorText: 'Incorrect login or password',
      }),
    };
  }
}
