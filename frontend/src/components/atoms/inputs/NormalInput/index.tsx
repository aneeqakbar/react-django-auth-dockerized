import React, { FC } from 'react'

interface INormalInput extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const NormalInput: FC<INormalInput> = ({ label, className, ...props }) => {
    return (
        <div>
            {label && (
                <label htmlFor={`${label}-id`} className="block mb-2 text-sm font-medium text-white">
                    {label}
                </label>
            )}
            <input
                id={`${label}-id`}
                type="text"
                className={`bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 outline-none ${className}`}
                {...props}
            />
        </div>
    )
}

export default NormalInput