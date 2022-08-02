import { InlineKeyboard } from 'grammy'
import { PurchaseSheet } from '../sheets/Purchases'

export function categoryMenu() {
  const categories = new PurchaseSheet().getCategories()

  const menu = new InlineKeyboard()

  categories.forEach(category => {
    menu.text(category, 'category-' + category).row()
  })

  return menu
}
