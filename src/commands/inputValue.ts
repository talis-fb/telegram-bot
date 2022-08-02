import { Composer } from 'grammy'
import PurchaseMiddleware from '../middlewares/purchase'
import type { MyContext } from '../types'
import { PurchaseSheet } from '../sheets/Purchases'

import { categoryMenu } from '../menus/categorySelect'

import type { INewPurchase } from '../types'

const bot = new Composer<MyContext>()

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
