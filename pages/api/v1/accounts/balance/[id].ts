import { NextApiRequest, NextApiResponse } from 'next'
import SQL from 'sql-template-strings'
import Cors from 'cors'
import { StatusCodes } from 'http-status-codes'
import { acceptedOrigins, HttpMethods } from '../../../../../constants'
import middleware from '../../../database/middleware'
import { queryDatabase } from '@pages/api/database/database'

const allowedMethods = [HttpMethods.GET]

const cors = Cors({
  origin: acceptedOrigins,
  methods: allowedMethods,
})

const index = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  await middleware(request, response, cors)
  const { method, query } = request

  if (method === HttpMethods.GET) {
    const id = query.id as string

    if (isNaN(parseInt(id))) {
      response.status(StatusCodes.BAD_REQUEST).send(`id: ${id} is not valid.`)
      return
    }

    const result = await queryDatabase(SQL`
      SELECT uid, username, bankbalance
      FROM dev_bank.mybb_users
      WHERE uid=${id};
    `)

    response.status(StatusCodes.OK).json(result[0])
    return
  }

  response.setHeader('Allowed', allowedMethods)
  response.status(StatusCodes.METHOD_NOT_ALLOWED).end()
}

export default index
