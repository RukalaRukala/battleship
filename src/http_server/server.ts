import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import * as WebSocket from 'ws';

export const httpServer = http.createServer(function (req, res) {
  const __dirname = path.resolve(path.dirname(''));
  const file_path =
    __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
  fs.readFile(file_path, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

const wss = new WebSocket.Server({ server: httpServer });

wss.on('connection', (ws: WebSocket) => {
  console.log('Новое WebSocket соединение установлено.');

  ws.on('message', (message: WebSocket.Data) => {
    console.log('Получено сообщение от клиента: %s', message.toString());
    ws.send('Получено ваше сообщение: ' + message.toString()); // Отправляем обратно клиенту
  });

  ws.send('Привет, я сервер WebSocket!'); // Приветствуем клиента
});
