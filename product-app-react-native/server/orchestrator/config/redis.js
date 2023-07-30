const Redis = require('ioredis')

const redis = new Redis({
    password: process.env.PASSWORD_REDIS,
    host: process.env.HOST_REDIS,
    port: 18138

});

module.exports = redis