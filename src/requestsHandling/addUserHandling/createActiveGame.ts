import { createId } from '../../utils/createId.utils';
import { IActiveGame, IGame, IUser } from '../../data/data.model';
import { dataBase } from '../../data/data';

export function createActiveGame(initGameUser: IUser, roomOwnerUser: IUser) {
  const gameId = createId();

  const initiatingUserGame: IGame = {
    idGame: gameId,
    idPlayer: initGameUser.socketId as number,
  };

  const opponentUserGame: IGame = {
    idGame: gameId,
    idPlayer: roomOwnerUser.socketId as number,
  };

  const newActiveGame: IActiveGame = {
    id: gameId,
    games: [initiatingUserGame, opponentUserGame],
  };

  dataBase.activeGames.push(newActiveGame);

  return newActiveGame.id;
}
