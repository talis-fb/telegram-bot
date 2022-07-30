import { Composer } from 'telegraf'
import PurchaseMiddleware from '../middlewares/purchase'
import { TransitionsSheet } from '../sheets/Transistions'

const bot = new Composer()
const sheet = new TransitionsSheet()

bot.use(PurchaseMiddleware)
bot.on('text', async ctx => {
  const dadesToSave: Array<string | number> = ctx.state.linesMsg
  await sheet.appendNewLine(dadesToSave)
  ctx.reply('Foi')
})

export default bot
