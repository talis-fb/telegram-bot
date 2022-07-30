// import { Spreadsheet } from '../model'
//
// export class ISheet {
//   sheetName: string = ''
//   private spreadsheet: Spreadsheet = Spreadsheet.getInstance()
//
//   private static instance: ISheet
//   static getInstance(): ISheet {
//     if (!ISheet.instance) {
//       ISheet.instance = new ISheet()
//     }
//
//     return ISheet.instance
//   }
//
//   readonly columns: any = []
//   model: any = {}
//
//   async save() {
//     const keysOfColumnsInOrder = this.columns
//     const values = []
//     for (let val of model)
//       await this.spreadsheet.append(this.sheetName + '!A1:A99', {
//         valueInputOption: 'RAW',
//         requestBody: {
//           values: [this.columns],
//         },
//       })
//   }
//
//   constructor() {}
// }
