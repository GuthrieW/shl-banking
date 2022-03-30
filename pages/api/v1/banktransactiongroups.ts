import SQL from 'sql-template-strings'
import { queryDatabase } from '../database/database'
import { getDatabaseName } from '../../../utils'

export const insertBankTransactionGroup = async ({
  creatorid,
  bankerid,
  groupname,
  isapproved,
}: BankTransactionGroup): Promise<any> => {
  return await queryDatabase(
    SQL`
    INSERT INTO `.append(getDatabaseName()).append(SQL`.mybb_banktransactions
      (creatorid, bankerid, groupname, isapproved, decisiondate)
    VALUES
      (${creatorid}, ${bankerid}, ${groupname}, ${isapproved}, NULL);
  `)
  )
}
