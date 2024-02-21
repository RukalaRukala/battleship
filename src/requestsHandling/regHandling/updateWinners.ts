import { IDataReg, IReg, IUserWinners } from './reg.model';
import { dataBase } from '../../data/data';
import { IUser } from '../../data/data.model';

export function updateWinners(response: IReg): IReg {
  const regData: IDataReg = JSON.parse(response.data);
  const winsData: IUserWinners = {
    name: regData.name,
    wins: (dataBase.users.find((user, i) => i === regData.index) as IUser).wins,
  };

  return { ...response, data: JSON.stringify(winsData) };
}
