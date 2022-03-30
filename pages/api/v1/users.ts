import SQL from 'sql-template-strings'
import { queryDatabase } from '../database/database'
import { getDatabaseName } from '../../../utils'

type BankBalance = {
  uid: number
}

export const getBankBalance = async ({ uid }: BankBalance): Promise<any> => {
  return await queryDatabase(
    SQL`
    SELECT uid, username, bankbalance
    FROM `.append(getDatabaseName()).append(SQL`.mybb_users
    WHERE uid=${uid};
  `)
  )
}
