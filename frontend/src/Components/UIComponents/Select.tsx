import React, { ChangeEvent } from "react";

interface Options {
    label: string;
    value: string;
}

interface SelectProps {
 value: string;
 onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
 disabled?: boolean;
 options: Options[]
}

const Select: React.FC<SelectProps> = ({value, onChange, disabled, options}) => {
  return (
    <select value={value} onChange={onChange} disabled={disabled} className="w-full p-3 rounded-md focus:outline-green-950 border border-f-gray'">
        {options.map((option: Options) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ))}
    </select>
  )
}

export default Select