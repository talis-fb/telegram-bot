import { Composer } from 'grammy'
import PurchaseFormatterMiddleware from '../../../middlewares/purchaseFormatter'
import type { MyContext, INewPurchase } from '../../../types'
import { categoryMenu } from '../../../menus/categorySelect'

const bot = new Composer<MyContext>()

bot.use(PurchaseFormatterMiddleware)
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

  ctx.reply('Selecione a categoria da sua compra :)', {
    reply_markup: categoryMenu(),
  })
})

export default bot
