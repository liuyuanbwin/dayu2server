const Router = require('koa-router')
const login = require('./login')
const register = require('./register')
const info = require('./info')
const list = require('./list')
const manager = require('./manager')

const router = new Router()

router.use('/login', login)
router.use('/register', register)
router.use('/info', info)
router.use('/list', list)
router.use('/manager',manager)

module.exports = router.routes()
