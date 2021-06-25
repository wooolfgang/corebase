import { GetServerSideProps } from 'next'
import isServerReq from 'app/lib/isServerReq'

// Skips loading getServerSideProps calls on client-side navigation
// https://github.com/vercel/next.js/issues/13910#issuecomment-810700824
export const isNavClientSide = (next: GetServerSideProps) => (ctx: any) => {
  if (isServerReq(ctx.req)) {
    return next(ctx)
  }

  return {
    props: {}
  }
}

export default isNavClientSide
