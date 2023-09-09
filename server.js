const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;
const logger = require('simple-node-logger').createSimpleLogger();
const mongoose = require('mongoose');
const apiRoutes = require('./routes');
const setCurrentUser = require('./utils/set-current-user');
const helmet = require('helmet');

// mongo-db connection
mongoose.connect('mongodb://127.0.0.1:27017/meet-it')
    .then(() => logger.info('[mongo-db-connect] mongodb connection open'))
    .catch(error => logger.error(`[mongo-db-connect] mongodb connection failed - ${error}`));

// request logger
app.use((req, res, next) => {
    logger.info(`[request] with url - ${req.url} started at ${new Date().toISOString()}`);
    next();
});

// middlewares
app.use(helmet);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(setCurrentUser);

//routes
app.use(apiRoutes);

app.listen(PORT, () => {
    logger.info(`server started and listening to port ${PORT}`);
});
