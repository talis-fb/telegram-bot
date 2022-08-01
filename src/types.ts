import type { Context, SessionFlavor } from 'grammy'

export type ISessionData = {
  purchase: {
    dades: [number, ...Array<string>] | null
    category: string | null
    payment: string | null
  }
}

export type MyContext = Context & {
  state: {
    msgLines: [number, ...Array<string>]
  }
} & SessionFlavor<ISessionData>
