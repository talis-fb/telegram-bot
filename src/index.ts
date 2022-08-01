// import http from 'http'
import * as dotenv from 'dotenv'
dotenv.config()

import commands from './commands'
import { MyContext } from './types'
import { sessionMiddleware } from './middlewares/sessions'
import { Bot } from 'grammy'

const app = new Bot<MyContext>(process.env.BOT_TOKEN || '')

app.use(sessionMiddleware())
app.use(...commands)
app.start()
