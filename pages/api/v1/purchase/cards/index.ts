import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { StatusCodes } from 'http-status-codes'
import { HttpMethods, packTypes } from '../../../../../constants'
import middleware from '../../../database/middleware'
import { bankLogTitles, insertBankLog } from '../../banklogs'
import { insertBankTransaction } from '../../banktransactions'

const allowedMethods = [HttpMethods.POST]

const cors = Cors({
  methods: allowedMethods,
  origin: 'http://localhost:9000',
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
      response.status(StatusCodes.BAD_REQUEST).json({
        error: `uid: ${uid} is not valid.`,
        purchaseSuccessful: false,
      })
      return
    }

    const packPrice = extractPackPrice(packType)
    if (packPrice === -1) {
      response.status(StatusCodes.BAD_REQUEST).json({
        error: `Invalid pack type: ${packType}`,
        purchaseSuccessful: false,
      })
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

    response.status(StatusCodes.OK).json({ purchaseSuccessful: true })
    return
  }

  response.setHeader('Allowed', allowedMethods)
  response.status(StatusCodes.METHOD_NOT_ALLOWED).json({
    error: 'Invalid method',
    purchaseSuccessful: false,
  })
}

export default index
