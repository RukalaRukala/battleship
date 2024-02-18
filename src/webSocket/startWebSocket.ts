import WebSocket from 'ws';

export function startWebSocket(port: string) {
  const wss = new WebSocket.Server({ port: +port });

  wss.on('connection', ws => {
    console.log('Client connected');

    ws.on('message', message => {
      console.log('Received message:', message.toString());
    });
  });
}
