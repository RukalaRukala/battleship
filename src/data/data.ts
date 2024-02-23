import { IDataBase } from './data.model';

export const dataBase: IDataBase = {
  users: [
    { name: 'Man', password: '12345', wins: 0, socketId: null, game: null },
    { name: 'Hulk', password: '67890', wins: 0, socketId: null, game: null },
    { name: 'LadyBee', password: 'beeee', wins: 0, socketId: null, game: null },
    { name: 'Girl', password: 'Sgirl', wins: 0, socketId: null, game: null },
  ],
  rooms: [],
  clients: [],
  games: [],
  winners: [],
};
