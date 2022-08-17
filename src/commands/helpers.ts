import { Composer } from 'grammy'
import fs from 'fs'
import path from 'path'

const bot = new Composer()

bot.command('help', async ctx => {
  const helpViewFile = path.join(__dirname, '..', '..', 'views', 'help.html')
  const helpViewContent = fs.readFileSync(helpViewFile, 'utf8')

  ctx.reply(helpViewContent, {
    parse_mode: 'HTML',
  })
})

export default bot
