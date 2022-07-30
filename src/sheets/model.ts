import { google } from 'googleapis'
import type { sheets_v4 } from 'googleapis'

import * as dotenv from 'dotenv'
dotenv.config()
const spreadsheetId = process.env.GOOGLE_SHEETS_ID || ''

// Types
type optionsAppend = sheets_v4.Params$Resource$Spreadsheets$Values$Append
type optionsUpdate = sheets_v4.Params$Resource$Spreadsheets$Values$Update
type optionsGet = sheets_v4.Params$Resource$Spreadsheets$Values$Get

// Class Singleton
class Spreadsheet {
  private constructor() {}

  private static instance: Spreadsheet
  private auth
  private client
  private sheet

  public static async setup() {
    if (!Spreadsheet.getInstance().auth) {
      const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      })

      Spreadsheet.instance.auth = auth
      Spreadsheet.instance.client = await auth.getClient()

      const sheet = google.sheets({
        version: 'v4',
        auth: Spreadsheet.instance.client,
      })
      Spreadsheet.instance.sheet = sheet.spreadsheets.values
    }
  }

  public static getInstance(): Spreadsheet {
    if (!Spreadsheet.instance) {
      Spreadsheet.instance = new Spreadsheet()
    }

    return Spreadsheet.instance
  }

  public async get(range: string, optins: optionsGet) {
    const model = Spreadsheet.instance.sheet
    return model.get({ spreadsheetId, range, ...optins })
  }

  public async update(range: string, optins: optionsUpdate) {
    const model = Spreadsheet.instance.sheet
    return model.update({ spreadsheetId, range, ...optins })
  }

  public async append(range: string, optins: optionsAppend) {
    const model = Spreadsheet.instance.sheet
    return model.append({ spreadsheetId, range, ...optins })
  }
}

export { Spreadsheet }
