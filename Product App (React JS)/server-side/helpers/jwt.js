var jwt = require('jsonwebtoken');

const secret = process.env.SECRET_KEY

const signToken = (data) => {
    return jwt.sign(data, secret)
}

const verifyToken = (token) => {
    return jwt.verify(token, secret)
}

// const access_token = signToken( { id: "1", name: "Uzi" } )
// var decoded = verifyToken(access_token)

// console.log( { access_token, decoded});

module.exports = {
    signToken,
    verifyToken
}