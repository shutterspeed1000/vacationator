const router = require('express').Router();
const apiRoutes = require('./api');
const view = require('./view');

router.use('/api', apiRoutes);
router.use('/', view);

module.exports = router;
