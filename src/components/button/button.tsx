import React from 'react';
import styles from './button.module.css';

type variant = 'primary' | 'secondary' | 'rainbow';

interface ButtonProps {
    variant: variant,
    text: string,
    className?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const Button = ({ variant, text, className, onClick } : ButtonProps) => {
  return (
    <button className={`${styles[variant]} ${className}`} onClick={onClick}>
      {text}
    </button>
  )
}
