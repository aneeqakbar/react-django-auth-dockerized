import React, { FC } from 'react'


interface INormalButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const NormalButton: FC<INormalButton> = ({ className, children, ...props }) => {
    return (
        <button
            className={`text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default NormalButton