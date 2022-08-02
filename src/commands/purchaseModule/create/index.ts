import { Composer } from 'grammy'
import type { MyContext } from '../../../types'

import Category, { categoryFilter } from './category'
import Input from './input'
import { finish, isFinish } from './finish'

const bot = new Composer<MyContext>()

// Flow...
// 1. o usuario esta para seleciona a categoria?
//  se sim -> Registra a chamada para quando o usuario clicar num botao selecionar o dado
//  Se o botao for acionado...
// 2. O usuario está apto a finalizar a compra?
//  se sim -> finaliza
//
// O flow de input, que ler os valores do usuario é indepedente.
// Ele pode setar um valor da compra a qualquer momento,
// porém a compra só é fechada quando se clica em algum InlineKeyboard

bot.filter(categoryFilter).use(Category).filter(isFinish).use(finish)
bot.use(Input)

export default bot
