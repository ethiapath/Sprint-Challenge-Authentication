const axios = require('axios');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const db = require('../database/dbConfig')

const { authenticate } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res) {
  // implement user registration
  try {
    const creds = req.body
    creds.password = bcrypt.hashSync(creds.password, 10)
    const userId = await db('users').insert(creds)
    console.log('userId', userId)
    res.status(201).json({userId: userId[0]})
  }
  catch (err) {
    res.status(500).json({err})
  }
}

async function login(req, res) {
  // implement user login
  try {
    const creds = req.body
    const user = await db('users').where({ username: creds.username }).first()
    
    const match = await bcrypt.compare(creds.password, user.password)
    if (match) {
      const token = genToken(user)
      res.status(200).json({message: 'authenticated', token})
    } else {
      res.status(401).json({message: 'Incorect login info'})
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({err})
  }
}

function genToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ['jokes', 'dad']
  }
  const secret = require('../_secrets/keys').jwtKey
  const options = {
    expiresIn: '1m',
  }
  return jwt.sign(payload, secret, options);
}

function getJokes(req, res) {
  axios
    .get('https://safe-falls-22549.herokuapp.com/random_ten')
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
