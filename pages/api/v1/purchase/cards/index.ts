import { NextApiRequest, NextApiResponse } from 'next'
import SQL from 'sql-template-strings'
import Cors from 'cors'
import { StatusCodes } from 'http-status-codes'
import {
  acceptedOrigins,
  HttpMethods,
  packTypes,
} from '../../../../../constants'
import middleware from '../../../database/middleware'
import { bankLogTitles, insertBankLog } from '../../banklogs'
import { insertBankTransaction } from '../../banktransactions'

const allowedMethods = [HttpMethods.POST]

const cors = Cors({
  origin: acceptedOrigins,
  methods: allowedMethods,
})

const extractPackPrice = (packType: string): number => {
  switch (packType) {
    case packTypes.challengeCup.key:
      return packTypes.challengeCup.price
    case packTypes.regular.key:
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
  const { method, query } = request

  if (method === HttpMethods.POST) {
    const uid = query.uid as string
    const packType = query.packType as string

    if (isNaN(parseInt(uid))) {
      response
        .status(StatusCodes.BAD_REQUEST)
        .send(`userId: ${uid} is not valid.`)
      return
    }

    const packPrice = extractPackPrice(packType)
    if (packPrice === -1) {
      response
        .status(StatusCodes.BAD_REQUEST)
        .send(`Invalid pack type: ${packType}`)
      return
    }

    await insertBankLog({
      title: bankLogTitles.ACTION,
      details: `${uid} attempts to purchase a ${packType} trading card pack.`,
    })

    await insertBankTransaction({
      uid: parseInt(uid),
      createdbyuserid: parseInt(uid),
      amount: packPrice,
      title: `${packType} Pack`,
      description: `Purchase ${packType} trading card pack.`,
    })

    response.status(StatusCodes.OK).send('Purchased card pack')
    return
  }

  response.setHeader('Allowed', allowedMethods)
  response.status(StatusCodes.METHOD_NOT_ALLOWED).end()
}

export default index
