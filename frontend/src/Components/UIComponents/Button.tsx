import React from "react";

type ButtonProps = {
    type?: "submit" | "reset" | "button" | undefined;
    children: string;
    disabled?: boolean;
    onClick?: () => void
};

const Button: React.FC<ButtonProps> = ({type, children, onClick, disabled}) => {
  return (
    <button 
        type={type} 
        onClick={onClick} 
        disabled={disabled}
        className="w-full px-5 py-3 rounded-xl bg-green-950 text-white text-lg"
        >
        {children}
    </button>
  )
}

export default Button