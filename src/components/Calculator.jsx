import { useState } from 'react'
import Display from './Display'
import Button from './Button'
import './Calculator.css'

const Calculator = () => {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num))
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.')
      setWaitingForNewValue(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForNewValue(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '×':
        return firstValue * secondValue
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  return (
    <div className="calculator">
      <Display value={display} />
      <div className="button-grid">
        <Button onClick={clear} className="function" text="C" />
        <Button onClick={() => {}} className="function" text="±" />
        <Button onClick={() => {}} className="function" text="%" />
        <Button onClick={() => performOperation('÷')} className="operator" text="÷" />
        
        <Button onClick={() => inputNumber(7)} text="7" />
        <Button onClick={() => inputNumber(8)} text="8" />
        <Button onClick={() => inputNumber(9)} text="9" />
        <Button onClick={() => performOperation('×')} className="operator" text="×" />
        
        <Button onClick={() => inputNumber(4)} text="4" />
        <Button onClick={() => inputNumber(5)} text="5" />
        <Button onClick={() => inputNumber(6)} text="6" />
        <Button onClick={() => performOperation('-')} className="operator" text="-" />
        
        <Button onClick={() => inputNumber(1)} text="1" />
        <Button onClick={() => inputNumber(2)} text="2" />
        <Button onClick={() => inputNumber(3)} text="3" />
        <Button onClick={() => performOperation('+')} className="operator" text="+" />
        
        <Button onClick={() => inputNumber(0)} className="zero" text="0" />
        <Button onClick={inputDecimal} text="." />
        <Button onClick={handleEquals} className="operator" text="=" />
      </div>
    </div>
  )
}

export default Calculator
