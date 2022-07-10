import { Spreadsheet } from '../model'

interface ITransition {
  id?: string
  value: number
  when: Date
}

const RANGE_TRANSITION = 'Transacoes'

// Inicialização da Classe Model
const Sheet = Spreadsheet.getInstance()
Spreadsheet.setup()

const getLastId = async (): Promise<number> => {
  const rangeIds = RANGE_TRANSITION + '!A1:A99'

  const listIds = await Sheet.get(rangeIds, {})

  if (listIds.data.values) {
    if (listIds.data.values[0]) {
      return listIds.data.values[0].at(-1) || 0
    }
  }

  return 0
}

const addTransition = async (dades: ITransition) => {
  const LastID = await getLastId()
  const ID = LastID + 1
  const { value, when } = dades

  await Sheet.append(RANGE_TRANSITION, {
    valueInputOption: 'RAW',
    requestBody: {
      values: [[ID, value, when]],
    },
  })

  console.log('COMPRA REGISTRADA NO VALOR DE R$' + dades.value)

  return ID
}

const editTransition = async (dades: ITransition) => {
  const { value, when } = dades
  await Sheet.update('Transacoes', {
    valueInputOption: 'RAW',
    requestBody: {
      values: [[value, when]],
    },
  })
}

export { addTransition, editTransition }
