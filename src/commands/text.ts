import { Composer } from 'telegraf'
import PurchaseMiddleware from '../middlewares/purchase'
import { PurchaseSheet } from '../sheets/Purchases'
import type { INewPurchase } from '../sheets/Purchases'

const bot = new Composer()
const sheet = new PurchaseSheet()

bot.use(PurchaseMiddleware)
bot.on('text', async ctx => {
  const dadesToSave: [number, ...Array<string>] = ctx.state.linesMsg

  const purchase: INewPurchase = {
    value: dadesToSave[0],
    where: dadesToSave[1],
    details: dadesToSave[2],
    category: dadesToSave[3],

    who: ctx.from.first_name,
  }

  await sheet.addPurchase(purchase)
  ctx.reply('Foi')
})

export default bot
