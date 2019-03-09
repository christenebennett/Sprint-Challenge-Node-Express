const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');

const ProjectsRouter = require('./projects/projectsRouter');
// const ActionsRouter = require('./actions/actionsRouter');

const server = express();
const parser = express.json();
const securtiyMiddleware = helmet();
const loggerMiddleware = logger();

server.use(parser, securtiyMiddleware, loggerMiddleware);
server.use('/api/projects', ProjectsRouter);
// server.use('/api/actions', ActionsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Sprint Challenge API!</h1>
  `)
})

module.exports = server;