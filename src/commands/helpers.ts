import { Composer } from 'grammy'
import fs from 'fs'
import path from 'path'

const bot = new Composer()

bot.command('help', async ctx => {
  ctx.reply(fs.readFileSync(path.join(__dirname, '/views/help.html'), 'utf8'), {
    parse_mode: 'HTML',
  })
})

export default bot
