import type { Context, NextFunction } from 'grammy'

export type MyContext = Context & {
  state: {
    msgLines: [number, ...Array<string>]
  }
}

export const formatMessage = (message: string): [number, ...Array<string>] => {
  let lines: string[] = message
    .split('\n')
    .map(m => m.trim())
    .filter(m => m.length > 0)

  const value = Number(lines[0].replace(',', '.'))
  lines.shift()

  if (isNaN(value)) {
    throw 'Primeiro valor invalido'
  }

  return [value, ...lines]
}

export default async (ctx: MyContext, next: NextFunction) => {
  const message = ctx.message
  try {
    if (!message || !message.text) {
      throw 'Sem valores passados'
    }
    ctx.state = {
      msgLines: formatMessage(message.text),
    }
  } catch (err) {
    return ctx.reply(err as string)
  }

  await next()
}

export {}
