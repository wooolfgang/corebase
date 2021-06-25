async function fetchAccessToken(): Promise<string> {
  const jsonRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ORIGIN}/api/refresh_token`,
    {
      method: 'POST',
      credentials: 'include'
    }
  )
  const res = await jsonRes.json()
  return res.accessToken
}

export default fetchAccessToken
