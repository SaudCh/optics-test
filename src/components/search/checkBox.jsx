import React from 'react'

export default function CheckBox({ handleFilter, name, value, label, checked }) {
    return (
        <div className="flex items-center mb-4">
            <input
                id={name + '-' + value}
                type="checkbox"
                className="w-4 h-4 text-xs font-semibold  bg-gray-100 border-gray-300 rounded "
                value={value}
                name={name}
                onClick={handleFilter}
                checked={checked}
            />
            <label
                for={name + '-' + value}
                className="text-xs font-medium ml-2 text-gray-700"
            >
                {label}
            </label>
        </div>
    )
}
