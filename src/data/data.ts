import { IDataBase } from './data.model';

export const dataBase: IDataBase = {
  users: [
    { name: 'RuMan', password: '12345', wins: 0, socketId: null },
    { name: 'Hulk', password: '12345', wins: 0, socketId: null },
    { name: 'LadyBee', password: '12345', wins: 0, socketId: null },
    { name: 'SGirl', password: '12345', wins: 0, socketId: null },
  ],
  rooms: [],
  clients: [],
  winners: [],
  activeGames: [],
};
