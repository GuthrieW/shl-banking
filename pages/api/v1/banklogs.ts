import SQL from 'sql-template-strings'
import { queryDatabase } from '../database/database'

export const bankLogTitles = {
  ACTION: 'ACTION',
  UNDO: 'UNDO',
}

export const insertBankLog = async ({
  title,
  details,
}: BankLog): Promise<any> => {
  return await queryDatabase(SQL`
    INSERT INTO admin_bybb.mybb_banklogs
      (title, details)
    VALUES
      (${title}, ${details});
  `)
}
