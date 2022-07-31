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

  async appendNewRow(sheetName: string, values: Array<string | number>) {
    await this.append(sheetName, {
      valueInputOption: 'RAW',
      requestBody: {
        values: [values],
      },
    })
  }

  async getLastRow(
    sheetName: string
  ): Promise<Array<string | number> | undefined> {
    const rangeIds = sheetName + '!A1:J99'
    const listIds = await this.get(rangeIds, {})

    if (listIds.data.values) {
      if (listIds.data.values.length) {
        return listIds.data.values.at(-1)
      }
    }
  }

  async getNumberOfRowByFirstColumn(
    id: string,
    sheetName: string
  ): Promise<number | undefined> {
    const rangeIds = sheetName + '!A1:A99'
    const listIds = await this.get(rangeIds, {})

    const values = listIds.data.values

    if (values) {
      if (Array.isArray(values)) {
        const index = values.findIndex(cel => cel[0] == id)
        if (index !== -1) {
          return index + 1
        }
      }
    }
  }

  async getRowByFirstColumn(
    value: string,
    sheetName: string
  ): Promise<any[] | undefined> {
    const rangeIds = sheetName + '!A1:J99'
    const listIds = await this.get(rangeIds, {})

    const values = listIds.data.values

    if (values) {
      if (Array.isArray(values)) {
        return values.find(cel => cel[0] == value)
      }
    }
  }

  async getRowAndNumberByFirstColumn(
    value: string,
    sheetName: string
  ): Promise<[any[], number] | undefined> {
    const rangeIds = sheetName + '!A1:J99'
    const listIds = await this.get(rangeIds, {})

    const values = listIds.data.values

    if (values && Array.isArray(values)) {
      for (let [index, cels] of values.entries()) {
        if (cels[0] == value) {
          return [cels, index + 1]
        }
      }
    }
  }

  async getRow(ind: number, sheetName: string): Promise<any[] | undefined> {
    const rangeIds = sheetName + '!A1:J99'
    const listIds = await this.get(rangeIds, {})

    const values = listIds.data.values

    if (values) {
      if (Array.isArray(values)) {
        return values[ind - 1] // Como o sheet começa com 1 nas colunas, retirase aqui para ajustar com o array do index
      }
    }
  }

  async updateRow(
    rowNumber: number,
    sheetName: string,
    values: Array<string | number>
  ) {
    const range = sheetName + '!A' + rowNumber + ':J' + rowNumber
    await this.update(range, {
      valueInputOption: 'RAW',
      requestBody: {
        values: [values],
      },
    })
  }
  async clearRow(rowNumber: number, sheetName: string) {
    await this.updateRow(rowNumber, sheetName, ['', '', '', '', '', '', '', ''])
  }
}

export { Spreadsheet }
