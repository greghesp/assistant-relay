const low = require('lowdb');
const path = require('path');
const jwt = require('jsonwebtoken');

const FileSync = require('lowdb/adapters/FileSync');
const configAdapter = new FileSync(path.resolve('server/bin', 'config.json'));
const { logger } = require('../../../../server/helpers/logger');

export default async (req, res) => {
  try {
    const config = await low(configAdapter);
    const password = req.body.password;
    const pwExist = await config.get('password').value();

    if (password === pwExist) {
      const token = jwt.sign({ service: 'dashboard' }, process.env.jwtSecret);
      return res.status(200).send({ token });
    }
    logger.log('error', 'Invalid login attempt', { service: 'api', func: 'login' });
    res.status(401).send('Credentials do not match');
  } catch (e) {
    logger.log('error', e.message, { service: 'api', func: 'login' });
    res.status(500).send(e.message);
  }
};
