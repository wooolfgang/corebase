import { serialize, CookieSerializeOptions } from 'cookie'
import { NextApiResponse } from 'next'

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge!)
    options.maxAge! /= 1000
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}
