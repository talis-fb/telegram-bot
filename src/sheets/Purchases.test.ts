import { PurchaseSheet } from './Purchases'

describe('Funcao de formatacao de mensagem', () => {
  let purchase = new PurchaseSheet()

  it('Split correto', () => {
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
  })
})
