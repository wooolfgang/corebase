import jwt from 'jsonwebtoken'

export interface AccessTokenPayload {
  userId: string
}

export interface RefreshTokenPayload extends AccessTokenPayload {
  userId: string
  tokenVersion: number
}

export const createAccessToken = (payload: AccessTokenPayload) => {
  return jwt.sign(
    { userId: payload.userId },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: '15m'
    }
  )
}

export const createRefreshToken = (payload: RefreshTokenPayload) => {
  return jwt.sign(
    { userId: payload.userId, tokenVersion: payload.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '7d'
    }
  )
}
