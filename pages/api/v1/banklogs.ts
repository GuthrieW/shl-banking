import SQL, { SQLStatement } from 'sql-template-strings'
import { queryDatabase } from '../database/database'
import { getDatabaseName } from '../../../utils'

export const bankLogTitles = {
  ACTION: 'ACTION',
  UNDO: 'UNDO',
}

export const insertBankLog = async ({
  title,
  details,
}: BankLog): Promise<any> => {
  const databaseName = getDatabaseName()
  return await queryDatabase(
    SQL`
    INSERT INTO dev_bank.mybb_banklogs
      (title, details)
    VALUES
      (${title}, ${details});
  `
  )
}
