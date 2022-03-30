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
  const result = await queryDatabase(
    SQL`
    INSERT INTO `.append(getDatabaseName()).append(SQL`.mybb_banklogs
      (title, details)
    VALUES
      (${title}, ${details});
  `)
  )

  return result
}
