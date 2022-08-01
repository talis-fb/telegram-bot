import PurchaseMiddleware, {
  formatMessage,
  type MyContext,
} from '../../../src/middlewares/purchase'
import type { Context } from 'grammy'

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
  interface IContextTest extends Omit<Partial<MyContext>, 'message'> {
    message: {
      text: string
    }
  }

  it('Setou o valor no message correto', () => {
    const nextFn = jest.fn()
    const ctx: IContextTest = {
      message: {
        text: '12\nfoi',
      },
      state: {},
    }

    expect(() => PurchaseMiddleware(ctx as MyContext, nextFn)).not.toThrow()
    expect(ctx.state).toBeTruthy()
    expect(formatMessage(ctx.message.text)).toEqual(ctx.state.msgLines)
    expect(nextFn).toHaveBeenCalled()
  })

  it('Respondeu e nao chamou o Next', () => {
    const ctx: IContextTest = {
      message: {
        text: 'n\nfoi',
      },
      state: {},
      reply: jest.fn(),
    }
    const nextFn = jest.fn()

    expect(() => PurchaseMiddleware(ctx as MyContext, nextFn)).not.toThrow()
    expect(ctx.reply).toHaveBeenCalled()
    expect(nextFn).not.toHaveBeenCalled()
  })
})
