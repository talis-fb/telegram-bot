import { Spreadsheet } from '../Spreadsheet'
import { TransitionsSheet } from './Transistions'
import type { INewPurchase } from '../../types'

Spreadsheet.setup()

type IPurchase = INewPurchase & {
  id: string
}

// COLUMNS
// A ID Transition
// B When
// C Value
// D Category
// E Who
// F Where
// G Details

export class PurchaseSheet {
  private sheetName = 'Compras'
  private spreadsheet: Spreadsheet = Spreadsheet.getInstance()
  private transitions = new TransitionsSheet()

  private categories: string[] = [
    '🛒 Mercado',
    '😋 Comida',
    '🍞 Padaria',
    '👔 Vestuario',
    '✨ Lazer',
    '🏠 Casa',
    '🩸 Saude',
    '💔 Besteira',
    '💻 Eletrônicos',
    '🚌 Transporte',
    '💸 Emprestimos',
    '📚 Livro',
    '🍳 Gas',
  ]

  // Categories
  getCategories() {
    return [...this.categories]
  }
  addCategory(category: string) {
    this.categories.push(category)
  }
  deleteCategory(category: string) {
    this.categories = this.categories.filter(el => el !== category)
  }
  // ---------------------

  private ArrayToPurchase(arr: Array<string>): IPurchase {
    return {
      id: arr[0],
      value: Number(arr[1]),
      when: new Date(arr[2]),
      category: arr[3],
      who: arr[4],
      where: arr[5],
      details: arr[6],
    }
  }

  private PurchaseToArray(val: IPurchase): Array<string> {
    return [
      val.id,
      val.value,
      val.when ? val.when.toLocaleString() : '',
      val.category,
      val.who,
      val.where,
      val.details,
    ].map(el => String(el))
  }

  async addPurchase(purchase: INewPurchase) {
    const value = purchase.value
    const when = purchase.when || new Date()

    const transitionID = await this.transitions.create({ value, when })
    const purchaseToSave: IPurchase = { ...purchase, id: String(transitionID) }

    await this.spreadsheet.appendNewRow(
      this.sheetName,
      this.PurchaseToArray(purchaseToSave)
    )
  }

  async editPurchase(purchase: IPurchase) {
    // const id = purchase.id
    // const value = purchase.value
    // const when = new Date()
    // await this.transitions.edit(id, { value, when })
    // await this.spreadsheet.updateRow
    //
  }

  async deletePurchase(purchase: IPurchase) {
    // const { id } = purchase
    // await this.transitions.payoff(id)
    // await this.spreadsheet.getRowByFirstColumn(id, this.sheetName)
  }

  async replaceLastPurchase(purchase: INewPurchase) {
    // const lastShop = await this.spreadsheet.getLastRow(this.sheetName)
    //
    // const value = purchase.value
    // const when = purchase.when || new Date()
    // this.transitions.create({ value, when })
  }
}
