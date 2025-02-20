import React, { ChangeEvent, forwardRef } from "react";

type InputProps = {
  type: string;
  placeholder?: string;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  styling: "primary" | "secondary" | "tertiary";
  min?: string | number;
  max?: string | number;
  error?: boolean;
};

interface Styling {
  standard: string;
  primary: string;
  secondary: string;
  tertiary: string;
}

// const Input: React.FC<InputProps> = ({
//   type,
//   placeholder,
//   value,
//   onChange,
//   disabled,
//   styling,
//   min,
//   max,
// }) => {
//   const inputStyling: Styling = {
//     standard:
//       "w-full p-3 rounded-md focus:outline-c-green-50 border border-c-grey-20 bg-white",
//     primary: "px-12",
//     secondary: "pl-12",
//     tertiary: "",
//   };

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      placeholder,
      value,
      onChange,
      disabled,
      styling,
      min,
      max,
      error,
      ...rest
    },
    ref
  ) => {
    const inputStyling: Styling = {
      standard:
        "w-full p-3 rounded-md focus:outline-c-green-50 border border-c-grey-20 bg-white",
      primary: "px-12",
      secondary: "pl-12",
      tertiary: "",
    };

    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        className={`${inputStyling.standard} ${inputStyling[styling]} ${
          error ? "border-red-500" : "border-c-grey-20"
        }`}
        disabled={disabled}
        ref={ref}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
