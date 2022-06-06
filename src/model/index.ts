import { SpreadsheetSetup } from './setup'
import type { sheets_v4 } from 'googleapis'

import * as dotenv from 'dotenv'
dotenv.config()
const spreadsheetId = process.env.GOOGLE_SHEETS_ID || ''

// Types
type optionsAppend = sheets_v4.Params$Resource$Spreadsheets$Values$Append
type optionsUpdate = sheets_v4.Params$Resource$Spreadsheets$Values$Update
type optionsGet = sheets_v4.Params$Resource$Spreadsheets$Values$Get

const Spreadsheet = {
  methods: {
    get: async (range: string, optins: optionsGet) => {
      const model = await SpreadsheetSetup()
      return model.get({ spreadsheetId, range, ...optins })
    },
    update: async (range: string, optins: optionsUpdate) => {
      const model = await SpreadsheetSetup()
      return model.update({ spreadsheetId, range, ...optins })
    },
    append: async (range: string, optins: optionsAppend) => {
      const model = await SpreadsheetSetup()
      return model.append({ spreadsheetId, range, ...optins })
    },
  },
}

export { Spreadsheet }
