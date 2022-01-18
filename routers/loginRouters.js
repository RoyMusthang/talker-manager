const router = require('express').Router();
const TOKEN = generateToken();
const loginAuthentication = require('../middlewares/loginAuthentication');

app.post('/login', loginAuthentication, (req, res) => {
  req.header = { ...req.header, authorization: TOKEN };
  return res.status(200).json({ token: TOKEN });
});
