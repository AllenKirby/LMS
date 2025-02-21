import React from "react";

type ButtonProps = {
  type?: "submit" | "reset" | "button" | undefined;
  children: string;
  disabled?: boolean;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  type,
  children,
  onClick,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full h-fit p-3 rounded-md bg-c-green-60 hover:opacity-90 active:bg-c-green-70 text-f-light text-p-rg font-medium"
    >
      {children}
    </button>
  );
};

export default Button;
