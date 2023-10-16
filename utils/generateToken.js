const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const createAccessToken = (data) => jwt.sign(data, secret, {expiresIn: '60s'});
const createRefreshToken = (data) => jwt.sign(data, secret, {expiresIn: '1d'});

module.exports = { createAccessToken,createRefreshToken };