require('dotenv').config()

const Hapi = require('@hapi/hapi')
const Jwt = require('@hapi/jwt')

// Plugins
const activeDay = require('./apis/active-day')
const antrianOnline = require('./apis/antrian-onilne')
const antrianOts = require('./apis/antrian-ots')
const admin = require('./apis/admin')
const auth = require('./apis/auth')
const userAuth = require('./apis/user-auth')

const TokenManager = require('./tokenize/TokenManager')

// Service
const ActiveDayService = require('./services/ActiveDayService')
const AntrianOnlineService = require('./services/AntrianOnlineService')
const AntrianOtsService = require('./services/AntrianOtsService')
const AdminService = require('./services/AdminService')
const AuthService = require('./services/AuthService')
const UserService = require('./services/UserService')


// Validator
const ActivedayValidator = require('./validators/ActiveDay')
const AntrianOnlineValidator = require('./validators/AntrianOnline')
const AntrianOtsValidator = require('./validators/AntrianOts')

const init = async () => {
    const server = Hapi.server({
        port: 2000,
        host: `localhost`,
        routes: {
            cors: {
                origin: ['*']
            }
        }
    })

    const activeDayService = new ActiveDayService()
    const antrianOnlineService = new AntrianOnlineService()
    const antrianOtsService = new AntrianOtsService()
    const adminService = new AdminService()
    const authService = new AuthService()
    const userService = new UserService()

    // register external plugins
    await server.register([
        {
            plugin: Jwt
        }
    ])

    // auth strategy
    server.auth.strategy('antrian_jwt', 'jwt', {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE
        },
        validate: artifacts => ({
            isValid: true,
            credentials: {
                id: artifacts.decoded.payload.id
            }
        })
    })

    await server.register([
        {
            plugin: auth,
            options: {
                service: {
                    adminService,
                    authService
                },
                tokenManager: TokenManager
            }
        },
        {
            plugin: userAuth,
            options: {
                service: {userService},
                tokenManager: TokenManager
            }
        },
        {
            plugin: activeDay,
            options: {
                service: activeDayService,
                validator: ActivedayValidator
            }
        },
        {
            plugin: antrianOnline,
            options: {
                service: {
                    antrianOnlineService,
                    activeDayService
                },
                validator: AntrianOnlineValidator
            }
        },
        {
            plugin: antrianOts,
            options: {
                service: {
                    antrianOtsService,
                    activeDayService
                },
                validator: AntrianOtsValidator
            }
        },
        {
            plugin: admin,
            options: {
                adminService
            }
        }
    ])

    await server.start()

    console.log(`Server berjalan pada ${server.info.uri}`)
}

init()