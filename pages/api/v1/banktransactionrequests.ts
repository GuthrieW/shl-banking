import SQL from 'sql-template-strings'
import { queryDatabase } from '../database/database'

export const insertBankTransactionRequest = async ({
  uid,
  amount,
  title,
  description,
  groupid,
}: BankTransactionRequest): Promise<any> => {
  return await queryDatabase(SQL`
    INSERT INTO admin_bybb.mybb_banktransactions
      (uid, amount, title, description, groupid)
    VALUES
      (${uid}, ${amount}, ${title}, ${description}, ${groupid});
  `)
}
