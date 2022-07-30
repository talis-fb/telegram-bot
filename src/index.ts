// import http from 'http'
import * as dotenv from 'dotenv'
dotenv.config()

import commands from './commands'
import { Telegraf } from 'telegraf'

const app = new Telegraf(process.env.BOT_TOKEN || '')

app.use(...commands)
app.launch()
