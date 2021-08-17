const express = require("express");
const server = express();

const cors = require("cors");
server.use(cors());

const bodyParser = require("body-parser");
server.use(bodyParser.json());

const { db } = require("./models/db");
const Message = require("./models/Message")(db);

server.get(`/`, (req, res) => {
  res.send({ hello: "world" });
});

server.get(`/messages`, async (req, res) => {
  res.send({ messages: await Message.findAll() });
});

server.post(`/messages`, async (req, res) => {
  await Message.create({
    timestamp: new Date(),
    received: req.body.received,
    content: req.body.content,
  });

  const messages = await Message.findAll();

  res.send({ messages });
});
//changed git

server.delete(`/messages/:id`, async (req, res) => {
  await Message.destroy({ where: { id: req.params.id } });

  res.send({ messages: await Message.findAll() });
});

server.put(`/messages/:id`, async (req, res) => {
  let myMessage = await Message.findOne({ where: { id: req.params.id } });
  myMessage.content = req.body.content;
  myMessage.timestamp = new Date();
  await myMessage.save();

  res.send({ messages: await Message.findAll() });
});

let port = process.env.PORT;
if (!port) {
  port = 3002;
}

server.listen(port, () => {
  console.log(`Server is running on 3002`);
});
