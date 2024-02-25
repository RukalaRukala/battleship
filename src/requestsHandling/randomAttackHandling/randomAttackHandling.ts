import { IMessage } from '../message.model';
import { createMessage } from '../../utils/createMessage.utils';
import { TYPES_ENUM } from '../../interfaces/types.model';
import { ATTACK_STATUS, IRandomAttack } from './attack.model';
import { getActiveGame } from '../../utils/getActiveGame.utils';
import { dataBase } from '../../data/data';
import { sendTurnToUser } from './sendTurnToUser';
import { getAttackData } from './getAttackData';

export function randomAttackHandling(request: IMessage) {
  const requestData: IRandomAttack = JSON.parse(request.data);
  const activeGame = getActiveGame(requestData.gameId);
  const attackData = getAttackData(request.type, requestData.indexPlayer);

  const attackMessage = createMessage(TYPES_ENUM.ATTACK, attackData);
  const activeGameUsersIds = activeGame.games.map(game => game.idPlayer);
  const clientToSend = dataBase.clients.filter(client =>
    activeGameUsersIds.includes(client.id)
  );

  clientToSend.forEach(client => {
    const enemyId = activeGame.games.find(
      game => game.idPlayer !== requestData.indexPlayer
    )?.idPlayer as number;
    client.send(attackMessage);
    if (attackData.status === ATTACK_STATUS.MISS) {
      sendTurnToUser(client, enemyId);
      return;
    }
    sendTurnToUser(client, requestData.indexPlayer);
  });
}
