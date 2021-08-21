const express = require("express");
const server = express();

const cors = require("cors");
server.use(cors());

const bodyParser = require("body-parser");
server.use(bodyParser.json());

const { db } = require("./models/db");
const Message = require("./models/Message")(db);

server.get(`/chat`, async (req, res) => {
  res.send({ messages: await Message.findAll() });
});

server.post(`/chat`, async (req, res) => {
  await Message.create(req.body);
  res.send({ messages: await Message.findAll() });
});

server.put("/chat/:index", (req, res) => {
  messages[req.params.index].text = req.body.text;
  res.send({ messages });
});
server.delete("/chat/:index", (req, res) => {
  messages.splice(req.params.index, 1);
  res.send({ messages });
});

server.get("/", (req, res) => {
  res.send("Hello World");
});

let port = process.env.PORT;
if (!port) {
  port = 3002;
}

server.listen(port, () => {
  console.log(`Server is running on 3002`);
});
