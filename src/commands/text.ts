import { Composer } from 'grammy'
import PurchaseMiddleware from '../middlewares/purchase'
import type { MyContext } from '../types'
import { PurchaseSheet } from '../sheets/Purchases'

import { categoryMenu } from '../menus/categorySelect'

import type { INewPurchase } from '../sheets/Purchases'

const bot = new Composer<MyContext>()
const sheet = new PurchaseSheet()

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

  await sheet.addPurchase(purchase)

  ctx.reply('Foi', {
    reply_markup: categoryMenu(),
  })
})

bot.callbackQuery('categoria', ctx => {
  ctx.reply('Clicou no categoria')
})

bot.callbackQuery('venda', ctx => {
  ctx.reply('Clicou no venda')
})

// bot.on('message:entities:underline')

export default bot
