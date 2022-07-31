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

  private async getRowWithId(
    id: string
  ): Promise<Array<string | number> | undefined> {
    const n_row = await this.spreadsheet.getNumberOfRowWithFirstColumnEqual(
      id,
      this.sheetName
    )
    if (n_row) {
      return await this.spreadsheet.getRow(n_row, this.sheetName)
    } else {
      throw 'Linha passada nao encontrada'
    }
  }

  private async getRowAndNumberRowWithId(
    id: string
  ): Promise<[Array<string | number>, number]> {
    const n_row = await this.spreadsheet.getNumberOfRowWithFirstColumnEqual(
      id,
      this.sheetName
    )
    if (n_row) {
      const row = await this.spreadsheet.getRow(n_row, this.sheetName)
      if (row) {
        return [row, n_row]
      }
    }
    throw 'Linha passada nao encontrada'
  }

  async create({ value, when }: ITransition) {
    const lastId = await this.getLastId()
    await this.spreadsheet.appendNewRow(this.sheetName, [
      lastId,
      value,
      when.toISOString(),
    ])
  }

  async edit(id: string, { value, when }: ITransition) {
    const [row, n_row] = await this.getRowAndNumberRowWithId(id)

    if (row) {
      row[1] = value
      row[3] = when.toISOString()
      await this.spreadsheet.updateRow(n_row, this.sheetName, row)
    } else {
      throw 'Linha passada nao encontrada'
    }
  }

  async delete(id: string) {
    const n_row =
      (await this.spreadsheet.getNumberOfRowWithFirstColumnEqual(
        id,
        this.sheetName
      )) || 0
    const row = await this.spreadsheet.getRow(n_row, this.sheetName)
    if (row) {
      row[1] = 0
      await this.spreadsheet.updateRow(n_row, this.sheetName, row)
    } else {
      throw 'Linha passada nao encontrada'
    }
  }
}
