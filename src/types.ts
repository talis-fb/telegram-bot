import type { Context, SessionFlavor } from 'grammy'

export interface INewPurchase {
  value: number
  when?: Date
  category?: string
  who?: string
  where?: string
  details?: string
}

export type ISessionData = {
  purchase: {
    dades: INewPurchase | null
    category: string | null
    payment: string | null
  }
}

export type MyContext = Context & {
  state: {
    msgLines: [number, ...Array<string>]
  }
} & SessionFlavor<ISessionData>
