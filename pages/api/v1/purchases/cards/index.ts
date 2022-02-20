import { NextApiRequest, NextApiResponse } from 'next'
import SQL from 'sql-template-strings'
import Cors from 'cors'
import { StatusCodes } from 'http-status-codes'
import { acceptedOrigins, packTypes } from '../../../../../constants'
import middleware from '../../../database/middleware'
import { bankLogTitles, insertBankLog } from '../../banklogs'
import { insertBankTransaction } from '../../banktransactions'

const POST = 'POST'

const allowedMethods = [POST]
const cors = Cors({
  origin: acceptedOrigins,
  methods: allowedMethods,
})

const extractPackPrice = (packType: string): number => {
  switch (packType) {
    case packTypes.challengeCup.name:
      return packTypes.challengeCup.price
    case packTypes.regular.name:
      return packTypes.regular.price
    default:
      return -1
  }
}

const index = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  await middleware(request, response, cors)
  const { method, query, body } = request

  if (method === POST) {
    const { userId, packType } = body
    const packPrice = extractPackPrice(packType)

    if (packPrice === -1) {
      response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(`Invalid pack type: ${packType}`)
      return
    }

    await insertBankLog({
      title: bankLogTitles.ACTION,
      details: `${userId} attempts to purchase a ${packType} trading card pack.`,
    })

    await insertBankTransaction({
      uid: userId,
      createdbyuserid: userId,
      amount: packPrice,
      title: `${packType} Pack`,
      description: `Purchase ${packType} trading card pack.`,
    })

    response.status(StatusCodes.OK).send('Purchased card pack')
  }

  response.setHeader('Allowed', allowedMethods)
  response.status(StatusCodes.METHOD_NOT_ALLOWED).end()
}

export default index
