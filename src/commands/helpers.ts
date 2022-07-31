import { Composer } from 'telegraf'
import fs from 'fs'
import path from 'path'

const bot = new Composer()

bot.help(async ctx => {
  ctx.replyWithMarkdown(
    fs.readFileSync(path.join(__dirname, '/views/help.html'), 'utf8'),
    {
      parse_mode: 'HTML',
    }
  )
})

export default bot
