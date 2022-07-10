import { Composer } from 'telegraf'

import { addTransition } from './controllers'

const bot = new Composer()

bot.help(async ctx => {
  ctx.reply('Digite o valor da compra, com uma linha do local')
})

// Get the lines of message
bot.use((ctx, next) => {
  if (ctx.message) {
    const message: string = (ctx.message as any).text
    if (message) {
      const lines: Array<string | number> = message.split('\n')
      ctx.state.linesMsg = lines
    }
  }
  return next()
})

bot.on('text', async ctx => {
  const argumentos: Array<string | number> = ctx.state.linesMsg

  console.log('Linhas recebidas...')
  console.table(argumentos)

  const value = Number(argumentos[0])
  const where = argumentos[1]
  const details = argumentos[2]

  if (isNaN(value)) return ctx.reply('responda com algo descente')

  try {
    await addTransition({ value, when: new Date() })
  } catch (err) {
    console.log('---------------')
    console.log('ERRO em Adicionar uma transicao...')
    console.log(err)
    console.log('---------------')
  }
})

bot.start(ctx => {
  ctx.reply('Bem-vinduu =D')
})

export default bot
