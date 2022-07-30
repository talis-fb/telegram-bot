import type { Context } from 'telegraf'

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

export default (ctx: Context, next: () => Promise<void>) => {
  if (ctx.message) {
    const message: string = (ctx.message as any).text
    if (message) {
      // const lines: Array<string | number> = message.split('\n')
      ctx.state.linesMsg = formatMessage(message)
    }
  }
  return next()
}
