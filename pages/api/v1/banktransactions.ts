import SQL from 'sql-template-strings'
import { queryDatabase } from '../database/database'
import { getDatabaseName } from '../../../utils'
import { canMakePurchase } from './utils/can-make-purchase'
import { StatusCodes } from 'http-status-codes'

export const insertBankTransaction = async ({
  uid,
  createdbyuserid,
  amount,
  title,
  description,
  groupid,
}: BankTransaction): Promise<any> => {
  const isValidPurchase = await canMakePurchase({
    uid,
    amount,
  })

  if (!isValidPurchase) {
    return false
  }

  await queryDatabase(
    SQL`
    INSERT INTO `.append(getDatabaseName()).append(SQL`.mybb_banktransactions
      (uid, createdbyuserid, amount, title, description, groupid)
    VALUES
      (${uid}, ${createdbyuserid}, ${amount}, ${title}, ${description}, ${groupid});
  `)
  )

  await queryDatabase(
    SQL`
    UPDATE `.append(getDatabaseName()).append(SQL`.mybb_users
    SET bankbalance = bankbalance + ${amount}
    WHERE uid=${uid};
  `)
  )

  return true
}
