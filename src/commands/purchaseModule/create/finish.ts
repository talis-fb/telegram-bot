import type { NextFunction } from 'grammy'
import type { MyContext } from '../../../types'
import { PurchaseSheet } from '../../../model/sheets/Purchases'

const sheet = new PurchaseSheet()
const isFinish = (ctx: MyContext): boolean => {
  const { category, dades } = ctx.session.purchase
  return Boolean(category && dades)
}

const finish = async (ctx: MyContext, next: NextFunction) => {
  const { category, dades } = ctx.session.purchase
  if (category && dades) {
    await sheet.addPurchase(dades)
    ctx.session.purchase = { dades: null, category: null, payment: null }
    return ctx.reply('✅ COMPRA REGISTRADA')
  }

  await next()
}

export { finish, isFinish }
