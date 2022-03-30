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
  const result = await queryDatabase(
    SQL`
    INSERT INTO `.append(getDatabaseName()).append(SQL`.mybb_banktransactions
      (uid, createdbyuserid, amount, title, description, groupid)
    VALUES
      (${uid}, ${createdbyuserid}, ${amount}, ${title}, ${description}, ${groupid});
  `)
  )

  const updateResult = await queryDatabase(
    SQL`
    UPDATE `.append(getDatabaseName()).append(SQL`.mybb_users
    SET bankbalance = bankbalance + ${amount}
    WHERE uid=${uid};
  `)
  )

  return result
}
