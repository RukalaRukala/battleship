import { dataBase } from '../../data/data';
import { TYPES_ENUM } from '../../interfaces/types.model';
import { ICheckResponse, IDataReg, IUserCredentials } from './reg.model';
import { isExistedUser } from './isExistedUser';
import { IMessage } from '../message.model';
import { IExtendedWebSocket } from '../../data/data.model';
import { createMessage } from '../../utils/createMessage';

export function getRegResponse(
  ws: IExtendedWebSocket,
  request: IMessage
): ICheckResponse {
  const credentials: IUserCredentials = JSON.parse(request.data);
  const data: IDataReg = {
    name: credentials.name,
    index: 0,
    error: false,
  };
  const existedUser = dataBase.users.find((existedUser, index) =>
    isExistedUser(ws, existedUser, credentials, data, index)
  );

  const response = createMessage(TYPES_ENUM.REG, data);
  const errorResponse = createMessage(TYPES_ENUM.REG, {
    ...data,
    error: true,
    errorText: 'Incorrect login or password',
  });

  const isValidCredentials =
    (existedUser && existedUser.password === credentials.password) || false;

  return {
    error: isValidCredentials,
    response: isValidCredentials ? response : errorResponse,
  };
}
