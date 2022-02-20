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

type TrainingData = {
  cost: number
  tpe: number
}

const allowedMethods = [HttpMethods.POST]

const cors = Cors({
  origin: acceptedOrigins,
  methods: allowedMethods,
})

const extractTrainingData = (
  trainingTier: string,
  isRookie: string
): TrainingData => {
  if (isRookie) {
    switch (trainingTier) {
      case '1':
        return { cost: 500000, tpe: 3 }
      case '2':
        return { cost: 250000, tpe: 2 }
      case '3':
        return { cost: 100000, tpe: 1 }
    }
  } else {
    switch (trainingTier) {
      case '1':
        return { cost: 1000000, tpe: 5 }
      case '2':
        return { cost: 500000, tpe: 3 }
      case '3':
        return { cost: 100000, tpe: 1 }
    }
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
    const trainingTier = query.trainingTier as string
    const isRookie = query.isRookie as string

    if (isNaN(parseInt(uid))) {
      response
        .status(StatusCodes.BAD_REQUEST)
        .send(`userId: ${uid} is not valid.`)
      return
    }

    if (isNaN(parseInt(trainingTier))) {
      console.log(query)
      response
        .status(StatusCodes.BAD_REQUEST)
        .send(`trainingTier: ${trainingTier} is not valid.`)
      return
    }

    if (isNaN(parseInt(isRookie))) {
      response
        .status(StatusCodes.BAD_REQUEST)
        .send(`isRookie: ${isRookie} is not valid.`)
      return
    }

    const { cost, tpe } = extractTrainingData(trainingTier, isRookie)

    await insertBankLog({
      title: bankLogTitles.ACTION,
      details: `${uid} attempts to purchase a tier ${trainingTier} ${
        isRookie ? 'rookie' : 'veteran'
      } training`,
    })

    await insertBankTransaction({
      uid: parseInt(uid),
      createdbyuserid: parseInt(uid),
      amount: cost,
      title: `Training +${tpe}`,
      description: `Purchased training for your player.`,
    })

    response.status(StatusCodes.OK).send('Purchased training')
    return
  }

  response.setHeader('Allowed', allowedMethods)
  response.status(StatusCodes.METHOD_NOT_ALLOWED).end()
}

export default index
