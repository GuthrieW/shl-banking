import SQL from 'sql-template-strings'
import { queryDatabase } from '../database/database'
import { getDatabaseName } from '../../../utils'

export const insertBankTransaction = async ({
  uid,
  createdbyuserid,
  amount,
  title,
  description,
  groupid,
}: BankTransaction): Promise<any> => {
  const databaseName = getDatabaseName()
  const result = await queryDatabase(SQL`
    INSERT INTO dev_bank.mybb_banktransactions
      (uid, createdbyuserid, amount, title, description, groupid)
    VALUES
      (${uid}, ${createdbyuserid}, ${amount}, ${title}, ${description}, ${groupid});
  `)
  console.log('insert transaction', result)
  return result
}
