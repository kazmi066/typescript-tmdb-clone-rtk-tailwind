import styles from './button.module.css';

type variant = 'primary' | 'secondary' | 'rainbow';

interface ButtonProps {
    variant: variant,
    text: string,
    className?: string
}

export const Button = ({ variant, text, className } : ButtonProps) => {
  return (
    <button className={`${styles[variant]} ${className}`}>
      {text}
    </button>
  )
}
