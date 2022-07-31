import { Spreadsheet } from './model'

Spreadsheet.setup()

export interface ITransition {
  value: number
  when: Date
  id?: string
}

export class TransitionsSheet {
  private sheetName = 'Transacoes'
  private spreadsheet: Spreadsheet = Spreadsheet.getInstance()

  private async getLastId(): Promise<string | number> {
    const lastRow = await this.spreadsheet.getLastRow(this.sheetName)

    if (lastRow !== undefined) {
      return lastRow.at(0)! // o ! serve para o compilador do TypeScript deixar de ser chato, já que eu já lidei com o undefined
    } else {
      return 0
    }
  }

  async create({ value, when }: ITransition) {
    const lastId = Number(await this.getLastId())
    if (isNaN(lastId)) throw 'Erro em pegar a ultima compra'

    const id = lastId + 1

    await this.spreadsheet.appendNewRow(this.sheetName, [
      id,
      value,
      when.toLocaleString(),
    ])

    return id
  }

  async edit(id: string, { value, when }: ITransition) {
    const selectedRow = await this.spreadsheet.getRowAndNumberByFirstColumn(
      id,
      this.sheetName
    )
    if (selectedRow) {
      const [row, n_row] = selectedRow
      if (row.length) {
        row[1] = value
        row[3] = when.toISOString()
        await this.spreadsheet.updateRow(n_row, this.sheetName, row)
      }
    } else {
      throw 'Linha passada nao encontrada'
    }
  }

  async payoff(id: string) {
    const selectedRow = await this.spreadsheet.getRowAndNumberByFirstColumn(
      id,
      this.sheetName
    )
    if (selectedRow) {
      const [row, n_row] = selectedRow
      if (row.length) {
        row[1] = 0
        await this.spreadsheet.updateRow(n_row, this.sheetName, row)
      }
    } else {
      throw 'Linha passada nao encontrada'
    }
  }
}
