const router = require('express').Router();
const userRoutes = require('./userRoutes');
const requestRoutes = require('./requestRoutes');

router.use("/user", userRoutes);
router.use("/request", requestRoutes);

module.exports = router;
