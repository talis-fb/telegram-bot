import { Spreadsheet } from './model'

Spreadsheet.setup()

export class TransitionsSheet {
  private sheetName = 'Transacoes'
  private spreadsheet: Spreadsheet = Spreadsheet.getInstance()

  async getLastId(): Promise<number> {
    const rangeIds = this.sheetName + '!A1:A99'
    const listIds = await this.spreadsheet.get(rangeIds, {})

    if (listIds.data.values) {
      if (listIds.data.values.length) {
        return listIds.data.values.at(-1)[0] || 0
      }
    }

    return 0
  }

  async getRowWithId(id: string): Promise<number | undefined> {
    const rangeIds = this.sheetName + '!A1:A99'
    const listIds = await this.spreadsheet.get(rangeIds, {})

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

  async appendNewLine(values: Array<string | number>) {
    await this.spreadsheet.append(this.sheetName + '!A1:A199', {
      valueInputOption: 'RAW',
      requestBody: {
        values: [values],
      },
    })
  }

  async updateTransition(id: string, values: Array<string | number>) {
    const row = await this.getRowWithId(id)

    if (!row) return null

    const range = this.sheetName + '!A' + row + ':J' + row
    console.log(range)
    // return
    await this.spreadsheet.update(range, {
      valueInputOption: 'RAW',
      requestBody: {
        values: [values],
      },
    })
  }
}
