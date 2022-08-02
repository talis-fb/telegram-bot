import { Composer } from 'grammy'
import { PurchaseSheet } from '../model/sheets/Purchases'
import type { MyContext } from '../types'

const bot = new Composer<MyContext>()
const sheet = new PurchaseSheet()

bot.callbackQuery(/category-*/, async (ctx, next) => {
  if (!ctx.session.purchase.dades) {
    return ctx.reply('Envie um valor')
  }

  const category = ctx.update.callback_query.data.replace('category-', '')

  ctx.session.purchase.category = category
  ctx.session.purchase.dades.category = category

  await next()
})

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
