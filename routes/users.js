const router = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');
const { validateUserBody } = require('../middlewares/validations');

router.get('/me', getUserInfo);
router.patch('/me', validateUserBody, updateUserInfo);

module.exports = router;
