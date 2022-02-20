import { NextApiRequest, NextApiResponse } from 'next'

export default (
  request: NextApiRequest,
  response: NextApiResponse,
  func: Function
) =>
  new Promise((resolve, reject) => {
    func(request, response, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
