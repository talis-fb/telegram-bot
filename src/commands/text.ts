import { Composer } from 'grammy'
import PurchaseMiddleware from '../middlewares/purchase'
import type { MyContext } from '../types'
import { PurchaseSheet } from '../sheets/Purchases'

import { categoryMenu } from '../menus/categorySelect'

import type { INewPurchase } from '../types'

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
bot.use(PurchaseMiddleware)
bot.on('message:text', async ctx => {
  const dadesToSave: [number, ...Array<string>] = ctx.state.msgLines

  const purchase: INewPurchase = {
    value: dadesToSave[0],
    where: dadesToSave[1],
    details: dadesToSave[2],
    category: dadesToSave[3],
    who: ctx.from.first_name,
  }

  ctx.session.purchase.dades = purchase

  ctx.reply('Selecione', {
    reply_markup: categoryMenu(),
  })
})

export default bot
