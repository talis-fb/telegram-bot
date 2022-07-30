import { Composer } from 'telegraf'

const bot = new Composer()

bot.help(async ctx => {
  ctx.reply('Digite o valor da compra, com uma linha do local')
})

export default bot
