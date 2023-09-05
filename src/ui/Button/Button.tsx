import React, { ReactNode, ButtonHTMLAttributes } from "react";
import cn from "classnames";
import styles from "./button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: string;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  type = "button",
  ...rest
}) => {
  const buttonClass = cn(styles.button, {
    [styles[variant]]: variant,
  });

  return (
    <button className={buttonClass} type={type} {...rest}>
      {children}
    </button>
  );
};
