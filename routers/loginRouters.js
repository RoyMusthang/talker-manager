const router = require('express').Router();
const {
  loginAuthentication,
  generateToken,
} = require('../middlewares/loginAuthentication.js');

router.post('/', loginAuthentication, (_req, res) => {
  try {
    const token = generateToken();
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
