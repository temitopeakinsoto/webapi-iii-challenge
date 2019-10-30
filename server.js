const express = require('express');
const userRouter = require('./users/userRouter.js');


const helmet = require('helmet');
const cors = require("cors");
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());


server.use('/api/users', userRouter);







server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {

};

module.exports = server;
