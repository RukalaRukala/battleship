import { IDataReg, IUserWinners } from './reg.model';
import { dataBase } from '../../data/data';
import { IUser } from '../../data/data.model';
import { IMessage } from '../message.model';

export function updateWinners(response: IMessage): IMessage {
  const regData: IDataReg = JSON.parse(response.data);
  const winsData: IUserWinners = {
    name: regData.name,
    wins: (dataBase.users.find((_, i) => i === regData.index) as IUser).wins,
  };

  return { ...response, data: JSON.stringify(winsData) };
}
