import { Composer } from 'telegraf'

import { addTransition } from './controllers'

const bot = new Composer()

bot.help(async ctx => {
  ctx.reply('Digite o valor da compra, com uma linha do local')
})

bot.on('text', async ctx => {
  const argumentos: Array<string | number> = ctx.message.text.split('\n')

  const value = Number(argumentos[0])
  const where = argumentos[1]
  const details = argumentos[2]

  if (isNaN(value)) return ctx.reply('responda com algo descente')

  console.table(argumentos)

  try {
    await addTransition({ value, when: new Date() })
  } catch (err) {
    console.log('ERRO no ccontroller')
    console.log(err)
  }
})

bot.start(ctx => {
  ctx.reply('Bem-vinduu =D')
})

export default bot
