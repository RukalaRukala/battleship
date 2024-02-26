import { dataBase } from '../data/data';
import { IActiveGame } from '../data/data.model';

export function getActiveGame(activeGameId: number) {
  return dataBase.activeGames.find(
    game => game.id === activeGameId
  ) as IActiveGame;
}
