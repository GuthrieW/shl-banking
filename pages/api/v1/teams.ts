import SQL from 'sql-template-strings'
import { queryDatabase } from '../database/database'

export const insertTeam = async ({
  name,
  acronym,
  rosterforumid,
  league,
  canDoBigTraining = 1,
}: Team): Promise<any> => {
  const acceptableLeagues = ['SHL', 'SMJHL']
  if (!acceptableLeagues.includes(league)) {
    return Promise.reject('Invalid league')
  }

  return await queryDatabase(SQL`
    INSERT INTO
      (name, acronym, rosterforumid, league, canDoBigTraining)
    VALUES
      (${name}, ${acronym}, ${rosterforumid}, ${league}, ${canDoBigTraining});
  `)
}
