import { IMessage } from '../message.model';
import { createMessage } from '../../utils/createMessage.utils';
import { TYPES_ENUM } from '../../interfaces/types.model';
import { ATTACK_STATUS, IAttack } from './attack.model';
import { getActiveGame } from '../../utils/getActiveGame.utils';
import { dataBase } from '../../data/data';
import { sendTurnToUser } from './sendTurnToUser';
import { getAttackData } from './getAttackData';
import {
  IExtendedWebSocket,
  IGame,
  IPosition,
  IUser,
  IWinner,
} from '../../data/data.model';
import { finishGame } from '../shipsHandling/finishGame';
import { viewRooms } from '../../utils/viewRooms.utils';
import { getWinners } from '../../utils/getWinners.utils';

export function attackHandling(ws: IExtendedWebSocket, request: IMessage) {
  const requestData: IAttack = JSON.parse(request.data);
  const activeGame = getActiveGame(requestData.gameId);
  const position: IPosition | undefined =
    requestData.x !== undefined && requestData.y !== undefined
      ? { x: requestData.x, y: requestData.y }
      : undefined;

  const enemy = activeGame.games.find(
    game => game.idPlayer !== requestData.indexPlayer
  ) as IGame;

  const curPlayer = activeGame.games.find(
    game => game.idPlayer === requestData.indexPlayer
  ) as IGame;

  const attackData = getAttackData(request.type, curPlayer, enemy, position);

  const [y, x] = [attackData.position.y, attackData.position.x];
  console.log(y, x);
  const isUserCanHit = !!curPlayer.enemyBoard?.cells[y][x] && curPlayer.turn;
  console.log(isUserCanHit);
  if (isUserCanHit) {
    const attackMessage = createMessage(TYPES_ENUM.ATTACK, attackData);

    const activeGameUsersIds = activeGame.games.map(game => game.idPlayer);

    const clientToSend = dataBase.clients.filter(client =>
      activeGameUsersIds.includes(client.id)
    );

    clientToSend.forEach(client => {
      console.log('attack');
      client.send(attackMessage);

      if (attackData.status === ATTACK_STATUS.MISS) {
        if (enemy.ships?.getShots() === 20) {
          viewRooms(client);
          client.send(finishGame(enemy.idPlayer));
          return;
        }
        console.log('turn to enemy');
        sendTurnToUser(client, enemy.idPlayer);
        curPlayer.turn = false;
        enemy.turn = true;
        return;
      }

      if (enemy.ships?.getShots() === 20) {
        const winner = dataBase.users.find(
          user => user.socketId === curPlayer.idPlayer
        ) as IUser;

        const isWinnerInWinners = dataBase.winners.find(
          eachWinner => eachWinner.name === winner.name
        );

        if (isWinnerInWinners) {
          if (winner.socketId === client.id) {
            const existedWinner = dataBase.winners.find(
              eachWinner => eachWinner.name === winner.name
            ) as IWinner;
            existedWinner.wins += 1;
          }
        } else {
          if (winner.socketId === client.id) {
            winner.wins += 1;
            dataBase.winners.push({ name: winner.name, wins: winner.wins });
          }
        }
        getWinners();
        viewRooms(client);
        client.send(finishGame(curPlayer.idPlayer));
        return;
      }

      console.log('turn to current');
      sendTurnToUser(client, requestData.indexPlayer);
    });
  }
}
