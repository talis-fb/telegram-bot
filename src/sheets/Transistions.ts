import { Spreadsheet } from './model'

Spreadsheet.setup()

export class TransitionsSheet {
  private sheetName = 'Transacoes'
  private spreadsheet: Spreadsheet = Spreadsheet.getInstance()

  async getLastId(id: string): Promise<number> {
    const rangeIds = this.sheetName + '!A1:A99'
    const listIds = await this.spreadsheet.get(rangeIds, {})

    if (listIds.data.values) {
      if (listIds.data.values[0]) {
        return listIds.data.values[0].at(-1) || 0
      }
    }

    return 0
  }

  async appendNewLine(values: Array<string | number>[]) {
    await this.spreadsheet.append(this.sheetName + '!A1:A99', {
      valueInputOption: 'RAW',
      requestBody: {
        values: [values],
      },
    })
  }

  async editTransition(newValues: string[]) {
    await this.spreadsheet.update('Transacoes', {
      valueInputOption: 'RAW',
      requestBody: {
        values: [newValues],
      },
    })
  }
}
