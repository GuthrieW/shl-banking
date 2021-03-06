import mysql from 'serverless-mysql'
import { SQLStatement } from 'sql-template-strings'

const dbConnection = mysql(
  process.env.NODE_ENV === 'production'
    ? {
        config: {
          host: process.env.DATABASE_HOST,
          user: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
        },
      }
    : {
        config: {
          host: process.env.DEV_DATABASE_HOST,
          user: process.env.DEV_DATABASE_USER,
          password: process.env.DEV_DATABASE_PASSWORD,
          database: process.env.DEV_DATABASE_NAME,
        },
      }
)

export const queryDatabase = async (
  query: SQLStatement
): Promise<any[] | any> => {
  try {
    const results: any[] = await dbConnection.query(query)
    await dbConnection.end()
    return results
  } catch (error) {
    return { error }
  }
}
