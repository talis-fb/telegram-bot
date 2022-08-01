import { Composer, InlineKeyboard } from 'grammy'
import PurchaseMiddleware, { type MyContext } from '../middlewares/purchase'
import { PurchaseSheet } from '../sheets/Purchases'

import { categoryMenu } from '../menus/categorySelect'

import type { INewPurchase } from '../sheets/Purchases'

const bot = new Composer<MyContext>()
const sheet = new PurchaseSheet()

bot.use(PurchaseMiddleware)
bot.on('message:text', async ctx => {
  console.log('compra enviada ' + ctx.state.msgLines)
  const dadesToSave: [number, ...Array<string>] = ctx.state.msgLines

  const purchase: INewPurchase = {
    value: dadesToSave[0],
    where: dadesToSave[1],
    details: dadesToSave[2],
    category: dadesToSave[3],
    who: ctx.from.first_name,
  }

  await sheet.addPurchase(purchase)
})

export default bot
