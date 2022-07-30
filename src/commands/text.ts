import { Composer } from 'telegraf'
import PurchaseMiddleware from '../middlewares/purchase'
import { TransitionsSheet } from '../sheets/Transistions'

const bot = new Composer()
const sheet = new TransitionsSheet()

bot.use(PurchaseMiddleware)
bot.on('text', async ctx => {
  sheet.appendNewLine(ctx.state.linesMsg)
  ctx.reply('Foi')
})

export default bot
