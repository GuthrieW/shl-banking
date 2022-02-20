import SQL from 'sql-template-strings'
import { queryDatabase } from '../database/database'
import { getDatabaseName } from '../../../utils'

export const insertBankTransactionRequest = async ({
  uid,
  amount,
  title,
  description,
  groupid,
}: BankTransactionRequest): Promise<any> => {
  const databaseName = getDatabaseName()
  return await queryDatabase(SQL`
    INSERT INTO dev_bank.mybb_banktransactions
      (uid, amount, title, description, groupid)
    VALUES
      (${uid}, ${amount}, ${title}, ${description}, ${groupid});
  `)
}
