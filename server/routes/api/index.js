const router = require('express').Router();
const userRoutes = require('../../controllers/userController');
const thoughtRoutes = require('../../controllers/thoughtController');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
