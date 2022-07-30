import { TransitionsSheet } from './Transistions'

interface IPurchase {
  id: string
  value: number
  category: string
  when: Date
  who: string
}

export class PurchaseSheet {
  private sheetName = 'Compras'
  private transitions = new TransitionsSheet()

  private categories: string[] = []

  getCategories() {
    return [...this.categories]
  }
  addCategory(category: string) {
    this.categories.push(category)
  }
  deleteCategory(category: string) {
    this.categories = this.categories.filter(el => el !== category)
  }

  async addPurchase(purchase: IPurchase) {
    const { id, value, category, when, who } = purchase

    this.transitions.appendNewLine([id, value, when.getDay(), who])
    // Append nessa planilha
  }

  async editPurchase(purchase: IPurchase) {
    const { id, value, category, when, who } = purchase
    this.transitions.updateTransition(id, [id, value, when.getDay(), who])
  }
}
