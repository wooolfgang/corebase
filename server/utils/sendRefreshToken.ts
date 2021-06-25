import { NextApiResponse } from 'next'
import { setCookie } from 'server/utils/cookies'

const sendRefreshToken = (token: String, res: NextApiResponse) => {
  setCookie(res, 'rt', token, {
    httpOnly: true,
    path: '/'
  })
}

export default sendRefreshToken
