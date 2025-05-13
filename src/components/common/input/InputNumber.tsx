import React, { useState, useRef } from "react"
import styles from "./InputNumber.module.scss"
import clsx from "clsx"

interface InputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  onChangeValue: (value: string) => void
}

const InputNumber: React.FC<InputNumberProps> = ({
  value = "0",
  min = 0,
  max,
  step = 1,
  disabled = false,
  onChangeValue,
  ...props
}) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value

    if (/^-?\d*\.?\d*$/.test(newValue) || newValue === "") {
      onChangeValue(newValue)
    }
  }

  const handleInputBlur = () => {
    setIsFocused(false)

    let newValue = parseFloat(value)

    if (isNaN(newValue)) {
      newValue = min
    }

    if (max && newValue > max) newValue = max
    if (newValue < min) newValue = min

    onChangeValue(newValue.toString())
  }

  const handleIncrement = () => {
    let newValue = parseFloat(value) + step
    if (max && newValue > max) newValue = max
    onChangeValue(newValue.toString())
  }

  const handleDecrement = () => {
    let newValue = parseFloat(value) - step
    if (newValue < min) newValue = min
    onChangeValue(newValue.toString())
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      handleIncrement()
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      handleDecrement()
    } else if (e.key === "Enter") {
      inputRef.current?.blur()
    }
  }

  const getStateClass = () => {
    if (disabled) return styles.disabled
    if (isFocused) return styles.focused
    if (isHovering) return styles.hover
    return ""
  }

  return (
    <div className={`${styles.container} ${getStateClass()}`}>
      <button
        className={clsx(styles.button, styles.buttonDecrement)}
        onClick={handleDecrement}
        disabled={disabled || parseFloat(value) <= min}
      >
        −
      </button>

      <div
        className={styles.inputContainer}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <input
          ref={inputRef}
          className={styles.input}
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          {...props}
        />
      </div>

      <button
        className={clsx(styles.button, styles.buttonIncrement)}
        onClick={handleIncrement}
        disabled={disabled || (!!max && parseFloat(value) >= max)}
      >
        +
      </button>
    </div>
  )
}

export default InputNumber
