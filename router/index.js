const router = require('express').Router();

router.use('/api/models',require('./model.route'));

module.exports = router;