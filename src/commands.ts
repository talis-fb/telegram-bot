import { Composer } from 'telegraf'

import { addTransition } from './controllers'

const bot = new Composer()

bot.start(ctx => {
  ctx.reply('Bem-vinduu =D')
})

bot.help(async ctx => {
  ctx.reply('Digite o valor da compra, com uma linha do local')
})

bot.on('text', async ctx => {
  const argumentos: Array<string | number> = ctx.message.text.split('\n')

  const value = Number(argumentos[0])
  // const where = argumentos[1]
  // const details = argumentos[2]

  if (isNaN(value)) return ctx.reply('responda com algo descente')

  console.table(argumentos)
  await addTransition({ value, when: new Date() })
})

export default bot
