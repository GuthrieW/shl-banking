import SQL from 'sql-template-strings'
import { queryDatabase } from '../database/database'

export const insertBankTransactionGroup = async ({
  creatorid,
  bankerid,
  groupname,
  isapproved,
}: BankTransactionGroup): Promise<any> => {
  return await queryDatabase(SQL`
    INSERT INTO admin_mybb.mybb_banktransactions
      (creatorid, bankerid, groupname, isapproved, decisiondate)
    VALUES
      (${creatorid}, ${bankerid}, ${groupname}, ${isapproved}, NULL);
  `)
}
