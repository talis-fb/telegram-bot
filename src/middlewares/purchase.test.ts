import PurchaseMiddleware, { formatMessage } from './purchase'
import type { Context, MiddlewareFn } from 'telegraf'

describe('Funcao de formatacao de mensagem', () => {
  it('Split correto', () => {
    const message = '12\nSupermercado\n Crédito '
    expect(formatMessage(message)).toEqual([12, 'Supermercado', 'Crédito'])

    const message2 = '5.67\n  Riachuelo  \n  '
    expect(formatMessage(message2)).toEqual([5.67, 'Riachuelo'])

    const message3 = '9,99'
    expect(formatMessage(message3)).toEqual([9.99])
  })

  it('Throw erro com primeiro valor nao sendo valido', () => {
    const messagesThatMustThrow = ['Supermercado\n Crédito ', '2,4.', 'l']

    for (let message of messagesThatMustThrow) {
      expect(() => formatMessage(message)).toThrow(/invalido/)
    }
  })
})

describe('Middleware', () => {
  it('Setou o valor no message correto', () => {
    // interface IContextTest extends Omit<Partial<Context>, 'message'> {
    // interface IContextTest extends Pick<Context, 'message' | 'state'> {
    // interface IContextTest extends Partial<Context> {
    interface IContextTest extends Omit<Partial<Context>, 'message'> {
      message: {
        text: string
      }
    }

    const ctx: IContextTest = {
      message: {
        text: '12\nfoi',
      },
      state: {},
    }
    const nextFn = jest.fn()

    PurchaseMiddleware(ctx as Context, nextFn)

    expect(ctx.state).toBeTruthy()
    expect(formatMessage(ctx.message.text)).toEqual(ctx.state.linesMsg)
    expect(nextFn).toHaveBeenCalled()
  })
})
