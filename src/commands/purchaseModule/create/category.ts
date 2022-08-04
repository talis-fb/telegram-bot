import { Composer } from 'grammy'
import type { MyContext } from '../../../types'

const bot = new Composer<MyContext>()

const categoryFilter = (ctx: MyContext): boolean => {
  const { category, dades } = ctx.session.purchase
  return Boolean(!category && dades)
}

bot.callbackQuery(/category-*/, async (ctx: MyContext, next) => {
  if (!categoryFilter(ctx)) {
    return ctx.reply(
      `❌ Envie um valor para poder clicar em uma categoria.\nSe precisar de ajudar digite o comando /help`
    )
  }

  const category = ctx.update.callback_query!.data!.replace('category-', '')

  ctx.session.purchase.category = category
  ctx.session.purchase.dades!.category = category

  await next()
})

export { categoryFilter }
export default bot
