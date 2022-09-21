import React, { FC } from 'react'

interface IErrorText {
    children: React.ReactNode | React.ReactNode[];
}

const ErrorText: FC<IErrorText> = ({ children }) => {
  return (
    <p
        className="font-light text-xs text-red-500 my-1"
    >
        {children}
    </p>
  )
}

export default ErrorText