import { ICurrentPlayer, IExtendedWebSocket } from '../../data/data.model';
import { createMessage } from '../../utils/createMessage.utils';
import { TYPES_ENUM } from '../../interfaces/types.model';

export function sendTurnToUser(client: IExtendedWebSocket, userId: number) {
  const currentPlayer = { currentPlayer: userId } as ICurrentPlayer;
  client.send(createMessage(TYPES_ENUM.TURN, currentPlayer));
}
