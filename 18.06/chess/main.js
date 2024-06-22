import http from "node:http";
import express from "express";
import { WebSocketServer } from "ws";

const app = express();
app.use(express.static("client"));

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    // console.log(message.toString());

    for (let s of wss.clients)
      s.send(message.toString());
  });
  //ws.send("Hello");
});

const host = 'localhost';
const port = 3030;

server.listen(port, host, () => {
  console.log(`Server started on http://${host}:${port}`);
});
