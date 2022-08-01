// import http from 'http'
import * as dotenv from 'dotenv'
dotenv.config()

import commands from './commands'
import { MyContext } from './middlewares/purchase'
import { Bot } from 'grammy'

const app = new Bot<MyContext>(process.env.BOT_TOKEN || '')

app.use(...commands)
app.start()
