import { google } from 'googleapis'
import { GoogleAuth } from 'google-auth-library'

const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const SpreadsheetSetup = async () => {
  const client = await auth.getClient()
  const sheet = google.sheets({ version: 'v4', auth: client })
  return sheet.spreadsheets.values
}

export { SpreadsheetSetup }
