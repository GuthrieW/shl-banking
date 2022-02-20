import SQL from 'sql-template-strings'
import { queryDatabase } from '../database/database'
import { getDatabaseName } from '../../../utils'

export const insertBankTransactionGroup = async ({
  creatorid,
  bankerid,
  groupname,
  isapproved,
}: BankTransactionGroup): Promise<any> => {
  const databaseName = getDatabaseName()
  return await queryDatabase(SQL`
    INSERT INTO dev_bank.mybb_banktransactions
      (creatorid, bankerid, groupname, isapproved, decisiondate)
    VALUES
      (${creatorid}, ${bankerid}, ${groupname}, ${isapproved}, NULL);
  `)
}
