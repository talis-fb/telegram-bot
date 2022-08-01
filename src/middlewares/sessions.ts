// import http from 'http'
import * as dotenv from 'dotenv'
dotenv.config()

import type { ISessionData } from '../types'
import { session } from 'grammy'

function initial(): ISessionData {
  return {
    purchase: {
      dades: null,
      category: null,
      payment: null,
    },
  }
}

export function sessionMiddleware() {
  return session({
    initial,
  })
}
