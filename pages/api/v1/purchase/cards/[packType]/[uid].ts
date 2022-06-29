import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { StatusCodes } from 'http-status-codes'
import { HttpMethods, packTypes } from '../../../../../../constants'
import middleware from '../../../../database/middleware'
import { bankLogTitles, insertBankLog } from '../../../banklogs'
import { insertBankTransaction } from '../../../banktransactions'

const allowedMethods = [HttpMethods.POST]

const cors = Cors({
  methods: allowedMethods,
  origin: 'http://localhost:9000',
})

const extractPackPrice = (packType: string): number => {
  switch (packType) {
    case packTypes.base.key:
      return packTypes.base.price
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
    const uid: string = query.uid as string
    const packType: string = query.packType as string

    if (isNaN(parseInt(uid))) {
      response.status(StatusCodes.BAD_REQUEST).json({
        error: `uid: ${uid} is not valid.`,
        purchaseSuccessful: false,
      })
      return
    }

    const packPrice: number = extractPackPrice(packType)
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

    const successfulPurchase: boolean = await insertBankTransaction({
      uid: parseInt(uid),
      createdbyuserid: parseInt(uid),
      amount: packPrice,
      title: `${capitalizeWord(packType)} Pack`,
      description: `Purchase ${packType} trading card pack.`,
    })

    if (!successfulPurchase) {
      response.status(StatusCodes.BAD_REQUEST).json({
        error: 'Insufficient Bank Balance',
        purchaseSuccessful: false,
      })
      return
    }

    response.status(StatusCodes.OK).json({ purchaseSuccessful: true })
    return
  }

  response.setHeader('Allowed', allowedMethods)
  response.status(StatusCodes.METHOD_NOT_ALLOWED).json({
    error: 'Invalid method',
    purchaseSuccessful: false,
  })
}

const capitalizeWord = (word: string): string => {
  const lower = word.toLowerCase()
  return word.charAt(0).toUpperCase() + lower.slice(1)
}

export default index
