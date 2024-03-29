import { Spreadsheet } from '../../src/model/Spreadsheet'

// Planilha usada para os testes
// --------------------
// A    B       C
// --------------------
// 1	12,00	Compra
// 2	3,00	Supermercado
// 3	44.685,00	Supermercado
// 4	2.76
// 5	0,00	Venda
// 6	2,00	Roupa
// 7	54.78	Açai
// 8	21,00	Comida
// 9	87,00	Lazer
// 10	1,00	Supermercado

describe('MODEL', () => {
  const sheet = Spreadsheet.getInstance()
  const NAME = 'TESTES'

  beforeAll(async () => {
    await Spreadsheet.setup()
  })

  it('Leitura', async () => {
    let last_row = await sheet.getLastRow(NAME)
    expect(last_row).toEqual(['10', '1,00', 'Supermercado'])

    // GET NUMBER ROW
    const n_10 = await sheet.getNumberOfRowByFirstColumn('10', NAME)
    expect(n_10).toBe(10)

    const n_2 = await sheet.getNumberOfRowByFirstColumn('2', NAME)
    expect(n_2).toBe(2)

    const nNotExist = await sheet.getNumberOfRowByFirstColumn('*&4', NAME)
    expect(nNotExist).toBe(undefined)

    // GET ROW
    const n_3 = await sheet.getRow(3, NAME)
    expect(n_3).toEqual(['3', '44.685,00', 'Supermercado'])

    const n_0 = await sheet.getRow(0, NAME)
    expect(n_0).toBe(undefined)

    const n_71 = await sheet.getRowByFirstColumn('7', NAME)
    expect(n_71).toEqual(['7', '54.78', 'Açai'])

    const n_72 = await sheet.getRowByFirstColumn('&=-', NAME)
    expect(n_72).toBe(undefined)

    const n_81 = await sheet.getRowAndNumberByFirstColumn('7', NAME)
    expect(n_81[0]).toEqual(['7', '54.78', 'Açai'])
    expect(n_81[1]).toBe(7)

    const n_82 = await sheet.getRowAndNumberByFirstColumn('&=-', NAME)
    expect(n_82).toBe(undefined)
  })

  it('Escrita', async () => {
    let last_row = async () => await sheet.getLastRow(NAME)
    const INITAL_LAST_ROW = ['10', '1,00', 'Supermercado']

    expect(await last_row()).toEqual(INITAL_LAST_ROW)

    await sheet.appendNewRow(NAME, [11, '5,55', 'Nova'])
    expect(await last_row()).toEqual(['11', '5,55', 'Nova'])

    await sheet.updateRow(11, NAME, [11, '333', 'Mais nova alteração'])
    expect(await last_row()).toEqual(['11', '333', 'Mais nova alteração'])

    await sheet.updateRow(11, NAME, ['X'])
    expect(await last_row()).toEqual(['X', '333', 'Mais nova alteração'])

    await sheet.clearRow(11, NAME)
    expect(await last_row()).toEqual(INITAL_LAST_ROW)
  })
})
