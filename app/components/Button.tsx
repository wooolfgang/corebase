import React from 'react'

interface Props extends React.HTMLProps<HTMLButtonElement> {
  children: React.ReactNode
  type: 'submit' | 'button'
}

type Ref = HTMLButtonElement

const defaultClassName =
  'font-serif px-2 py-1 text-white text-base font-medium text-right border-b-2 border-r-2 border-blue-600 bg-blue-500 focus:outline-none focus:ring-2 focus:border-blue-800 '

// eslint-disable-next-line react/display-name
const Button = React.forwardRef<Ref, Props>((props, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className={`${defaultClassName} ${props.className || ''}`}
    >
      {props.children}
    </button>
  )
})

export default Button
