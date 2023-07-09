const router = require('express').Router();

const {
  updateProfile, getUserInfo,
} = require('../controllers/users');

const { validateUserProfileBody } = require('../middlewares/validators');

router.get('/me', getUserInfo);
router.patch('/me', validateUserProfileBody, updateProfile);

module.exports = router;
