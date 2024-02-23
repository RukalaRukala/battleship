import { IExtendedWebSocket } from '../../data/data.model';
import { createGame } from './createGame';
import { IMessage } from '../message.model';
import { dataBase } from '../../data/data';

export function addUserHandling(ws: IExtendedWebSocket, request: IMessage) {
  dataBase.clients.forEach(client => client.send(createGame(ws, request)));
}
