const express = require('express');
const userRouter = require('./users/userRouter.js');

const helmet = require('helmet');
const cors = require("cors");
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.originalUrl}`
  );
  next();
});

server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});


module.exports = server;
