import { IMessage } from '../message.model';
import { createMessage } from '../../utils/createMessage.utils';
import { TYPES_ENUM } from '../../interfaces/types.model';
import { ATTACK_STATUS, IRandomAttack } from './attack.model';
import { getActiveGame } from '../../utils/getActiveGame.utils';
import { dataBase } from '../../data/data';
import { sendTurnToUser } from './sendTurnToUser';
import { getAttackData } from './getAttackData';
import { IGame } from '../../data/data.model';

export function randomAttackHandling(request: IMessage) {
  const requestData: IRandomAttack = JSON.parse(request.data);
  const activeGame = getActiveGame(requestData.gameId);

  const enemy = activeGame.games.find(
    game => game.idPlayer !== requestData.indexPlayer
  ) as IGame;

  const curPlayer = activeGame.games.find(
    game => game.idPlayer === requestData.indexPlayer
  ) as IGame;

  const attackData = getAttackData(request.type, curPlayer, enemy);

  const attackMessage = createMessage(TYPES_ENUM.ATTACK, attackData);

  const activeGameUsersIds = activeGame.games.map(game => game.idPlayer);

  const clientToSend = dataBase.clients.filter(client =>
    activeGameUsersIds.includes(client.id)
  );

  clientToSend.forEach(client => {
    client.send(attackMessage);
    if (attackData.status === ATTACK_STATUS.MISS) {
      sendTurnToUser(client, enemy.idPlayer);
      return;
    }
    sendTurnToUser(client, requestData.indexPlayer);
  });
}
