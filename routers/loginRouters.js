const router = require('express').Router();
const {
  loginAuthentication,
  generateToken,
} = require('../middlewares/loginAuthentication.js');

router.post('/', loginAuthentication, (_req, res) => {
  const token = generateToken();
    res.status(200).json({ token });
});

module.exports = router;
