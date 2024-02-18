import { httpServer } from './src/http_server/server';
import { startWebSocket } from './src/webSocket/startWebSocket';
import dotenv from 'dotenv';

dotenv.config();

httpServer.listen(process.env.HTTP_PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.HTTP_PORT}`);
});

startWebSocket();
