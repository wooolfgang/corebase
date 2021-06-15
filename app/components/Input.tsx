import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  parentClassname?: string
  labelClassname?: string
}

const defaultParentClassname = `mb-2 flex flex-col`
const defaultLabelClassname = `block text-sm mb-1 text-gray-700 font-serif`
const defaultInputClassname = `font-serif border border-solid border-gray-500  border-0 px-2 py-0.5 text-base focus:outline-none focus:ring-2 focus:border-blue-800`

// eslint-disable-next-line react/display-name
const Input: React.FC<Props> = React.forwardRef(
  ({ label, ...props }, ref: any) => (
    <div className={props.parentClassname || defaultParentClassname}>
      <label
        htmlFor={props.name || props.id}
        className={props.labelClassname || defaultLabelClassname}
      >
        {label}
      </label>
      <input
        {...props}
        ref={ref}
        className={props.className || defaultInputClassname}
      />
    </div>
  )
)

export default Input
