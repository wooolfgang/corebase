import { NextApiResponse } from 'next'
import { setCookie } from 'server/utils/cookies'

const sendRefreshToken = (token: String, res: NextApiResponse) => {
  setCookie(res, 'rt', token, {
    httpOnly: true,
    path: '/api/refresh_token'
  })
}

export default sendRefreshToken
