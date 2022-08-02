import { Composer } from 'grammy'
import { PurchaseSheet } from '../sheets/Purchases'
import type { MyContext } from '../types'

const bot = new Composer<MyContext>()
const sheet = new PurchaseSheet()

bot.use(async (ctx, next) => {
  const { category, dades } = ctx.session.purchase
  if (category && dades) {
    await sheet.addPurchase(dades)
    ctx.session.purchase = { dades: null, category: null, payment: null }
    return ctx.reply('COMPRA REGISTRADA')
  }

  await next()
})
export default bot
