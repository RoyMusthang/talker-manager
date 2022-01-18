const express = require('express');
const bodyParser = require('body-parser');
const talkerRouters = require('./routers/talkerRoutes');
const loginRouters = require('./routers/loginRouters');

const app = express();
app.use(bodyParser.json());

app.use('/login', loginRouters);
app.use('/talker', talkerRouters);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
