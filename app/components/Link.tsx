import React from 'react'
import Link from 'next/link'

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

// eslint-disable-next-line react/display-name
const NextLink: React.FC<Props> = React.forwardRef(
  ({ href, children, ...props }, ref: any) => {
    return (
      <Link href={href}>
        <a href={href} ref={ref} {...props}>
          {children}
        </a>
      </Link>
    )
  }
)

export default NextLink
