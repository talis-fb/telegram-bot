import { PurchaseSheet } from './Purchases'

describe('PURCHASE', () => {
  let purchase = new PurchaseSheet()

  it('Categorias', () => {
    purchase.addCategory('Compras')
    expect(purchase.getCategories()).toEqual(['Compras'])

    purchase.addCategory('Vendas')
    purchase.addCategory('Comida')
    purchase.addCategory('Aluguel')

    expect(purchase.getCategories()).toEqual([
      'Compras',
      'Vendas',
      'Comida',
      'Aluguel',
    ])

    purchase.deleteCategory('Vendas')
    expect(purchase.getCategories()).toEqual(['Compras', 'Comida', 'Aluguel'])

    purchase.deleteCategory('Vendas')
    expect(purchase.getCategories()).toEqual(['Compras', 'Comida', 'Aluguel'])
  })
})
