const router = require('express').Router();
const {
  loginAuthentication,
  generateToken,
} = require('../middlewares/loginAuthentication');

router.post('/login', loginAuthentication, (_req, res) => {
  res.status(200).json({ token: generateToken() });
});

module.exports = router;
