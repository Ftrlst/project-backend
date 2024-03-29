const Jwt = require('@hapi/jwt')
const InvariantError = require('../exceptions/InvariantError')

const TokenManager = {
    generateAccessToken: (payload) => Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY),
    generateRefreshToken: (payload) => Jwt.token.generate(payload, process.env.REFRESH_TOKEN_ENV),
    decodeToken: (token) => Jwt.token.decode(token),
    verifyRefreshToken: (refreshToken) => {
        try {
            const artifacts = Jwt.token.decode(refreshToken)
            Jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_ENV)
            return artifacts.decoded.payload
        } catch (error) {
            console.log(error)
            throw new InvariantError('Refresh token tidak valid')
        }
        
    }
}

module.exports = TokenManager