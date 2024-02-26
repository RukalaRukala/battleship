import { IMessage } from '../message.model';
import { createMessage } from '../../utils/createMessage.utils';
import { TYPES_ENUM } from '../../interfaces/types.model';
import { ATTACK_STATUS, IAttack } from './attack.model';
import { getActiveGame } from '../../utils/getActiveGame.utils';
import { dataBase } from '../../data/data';
import { sendTurnToUser } from './sendTurnToUser';
import { getAttackData } from './getAttackData';
import { IGame, IPosition } from '../../data/data.model';

export function randomAttackHandling(request: IMessage) {
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
        console.log('turn to enemy');
        sendTurnToUser(client, enemy.idPlayer);
        curPlayer.turn = false;
        enemy.turn = true;
        return;
      }
      console.log('turn to current');
      sendTurnToUser(client, requestData.indexPlayer);
    });
  }
}
