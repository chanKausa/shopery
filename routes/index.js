const express = require('express');
const router = express.Router();
const appRouter = require('./app');
const authRouter = require('./auth');

router.use('/api', appRouter);
router.use(authRouter);

module.exports = router;