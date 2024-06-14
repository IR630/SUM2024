import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { WebSocketServer } from "ws";

import express from "express";

const app = express();
app.use(express.static("client"));

let counter = 0;

// const requestListener = (req, res) => {
//   counter = counter + 1;
//   res.writeHead(200);
//   res.end(`Hello, num: ${counter}`);
// };
// const requestListener = async (req, res) => {
//   if (req.url == "/") {
//     const contents = await fs.readFile(
//       process.cwd() + "/client/index.html");
//     //const contents = await fs.readFile(__dirname + "/index.html");
//     res.setHeader("Content-Type", "text/html");
//     res.writeHead(200);
//     res.end(contents);
//   } else {
//     if (req.url.endsWith(".js")) {
//       const contents = await fs.readFile(
//         process.cwd() + "/client" + req.url);
//     }
//     res.setHeader("Content-Type", "text/javascript");
//     res.writeHead(200);
//     res.end(contents);
//   }
// };

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", ws => {
  ws.on("message", message => {
    console.log(message.toString());
    //ws.send(`${message}`);

    for (let s of wss.clients) {
      s.send(message.toString());
    }
  });

  // ws.send("Hi u hi");
});

const host = "localhost";
const port = 8080;

server.listen(port, host, () => {
  console.log(`Server started on http://${host}:${port}`);
});
