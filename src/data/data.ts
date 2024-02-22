import { IDataBase } from './data.model';

export const dataBase: IDataBase = {
  users: [
    { name: 'Superman', password: '12345', wins: 0, socketId: null },
    { name: 'Hulk', password: '67890', wins: 0, socketId: null },
    { name: 'LadyBee', password: 'beeee', wins: 0, socketId: null },
    { name: 'Super_girl', password: 'Sgirl', wins: 0, socketId: null },
  ],
  rooms: [],
  clients: [],
  winners: [],
};
