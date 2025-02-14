import React, { ChangeEvent } from "react";

type InputProps = {
  type: string;
  placeholder?: string;
  value?: string ;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  styling: "primary" | "secondary" | "tertiary";
  min?: string;
  max?: string
};

interface Styling {
  standard: string;
  primary: string;
  secondary: string;
  tertiary: string
}

const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange, disabled, styling, min, max }) => {

  const inputStyling: Styling = {
    standard: 'w-full p-3 rounded-md focus:outline-green-950 border border-f-gray',
    primary: 'px-12',
    secondary: 'pl-12',
    tertiary: ''
  }

  return (
    <input 
      type={type} 
      placeholder={placeholder} 
      value={value} 
      min={min}
      max={max}
      onChange={onChange} 
      className={`${inputStyling.standard} ${inputStyling[styling]}`} 
      disabled={disabled}/>
  )
};

export default Input;
