const express = require("express");
const server = express();
const router = require("./posts/posts-router");

server.use(express.json());
server.use("/api/posts", router);

server.get("/", (req, res) => {
  res.status(200).json({ message: "hello world" });
});

module.exports = server;
