function genereteToken() {
    let token = '';
    const base = 16; 
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < base; i += 1) {
      token += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return token;
}

function loginAuthentication(req, res, next) {
const emailRegexp = /\S+@\S+.\S+/;
// https://stackoverflow.com/questions/52456065/how-to-format-and-validate-email-node-js    

const { email, password } = req.body;
  if (email === undefined) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } else if (!emailRegexp.test(email)) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } else if (!password) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } else if (password.length < 6) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } 

  next();
}

module.exports = {
  loginAuthentication,
  genereteToken,
};
