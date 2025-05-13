import styles from "./button.module.scss"
import clsx from "clsx"
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  isActive?: boolean
}

function Button({ children, className, isActive, ...props }: ButtonProps) {
  return (
    <button {...props} className={clsx(styles.container, className, isActive && styles.active)}>
      {children}
    </button>
  )
}

export default Button
