const express = require('express');
const helmet = require('helmet');
const cohortsRoute = require('./cohortsRoute');
const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/cohorts', cohortsRoute);
module.exports = server;
