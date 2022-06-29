import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { StatusCodes } from 'http-status-codes'
import { HttpMethods } from '../../../../../constants'
import middleware from '../../../database/middleware'
import { getBankBalance } from '../../utils/get-bank-balance'

const allowedMethods = [HttpMethods.GET]

const cors = Cors({
  methods: allowedMethods,
  origin: 'http://localhost:9000',
})

const index = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  await middleware(request, response, cors)
  const { method, query } = request

  if (method === HttpMethods.GET) {
    const uid = query.uid as string

    if (isNaN(parseInt(uid))) {
      response.status(StatusCodes.BAD_REQUEST).send(`uid: ${uid} is not valid.`)
      return
    }

    const result = await getBankBalance({ uid: parseInt(uid) })

    response.status(StatusCodes.OK).json(result[0])
    return
  }

  response.setHeader('Allowed', allowedMethods)
  response.status(StatusCodes.METHOD_NOT_ALLOWED).end()
}

export default index
