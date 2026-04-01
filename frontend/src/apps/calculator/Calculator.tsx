import { useCallback, useEffect, useState } from "react"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"

const Calculator = () => {

  const [expression, setExpression] = useState('')
  const [activeKey, setActiveKey] = useState<string | null>(null)

  //#region Validate Expression
  const validateExpression = (expr: string) => {
    const validChars = /^[0-9+\-*/().% ]*$/
    const consecutiveOperators = /[+\-*/.]{2,}/

    if (consecutiveOperators.test(expr)) {
      return false
    }

    return validChars.test(expr)
  }
  //#endregion

  // Auto-insert brackets based on current expression state
  function getBracket(expr: string) {
    const openCount = (expr.match(/\(/g) || []).length;
    const closeCount = (expr.match(/\)/g) || []).length;
    const lastChar = expr.trim().slice(-1);

    // Insert closing bracket if there's an open one and last char is a digit or )
    if (openCount > closeCount && /[\d)]/.test(lastChar)) {
      return ')';
    }

    return '(';
  }

  const evaluateExpression = (expr: string) => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(expr.replace(/(\d+(\.\d+)?)%/g, '($1/100)'));
      setExpression(result.toString())
    } catch (error) {
      // Must not end with an operator
      if (/[+\-*/.%]$/.test(expr.trim())) {
        setExpression('Error: Expression cannot end with an operator')
      } else {
        setExpression('Error: Invalid expression')
      }
    }
  }

  // Handle button clicks and validate expression
  const handleInput = useCallback((input: string): void => {
    if (input === '(' || input === ')') {
      setExpression(prev => prev + getBracket(prev))
      return
    }

    if (input === '=') {
      evaluateExpression(expression)
      return
    }

    if (input === 'AC') {
      setExpression('')
      return
    }

    if (input === 'DEL') {
      setExpression(prev => prev.slice(0, -1))
      return
    }

    if (validateExpression(expression + input)) {
      setExpression(prev => prev + input)
    }
  }, [expression])


  // add keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyMap: Record<string, string> = {
        '0': '0',
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '+': '+',
        '-': '-',
        '*': '*',
        '/': '/',
        '.': '.',
        '%': '%',
        '(': '(',
        ')': ')',
        'Enter': '=',
        'Backspace': 'DEL',
        'Escape': 'AC'
      };

      const mapped = keyMap[e.key]
      if (mapped) {
        e.preventDefault()
        handleInput(mapped)
        setActiveKey(mapped)
      }
    }

    const handleKeyUp = () => {
      setActiveKey(null)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleInput])

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <Input styles="col-span-4 px-4 py-2 shadow-normal dark:shadow-glow transition-colors duration-400 ease-in-out" expression={expression} readonly />

        <Button label="AC" onClick={() => handleInput("AC")} styles="font-bold" isActive={activeKey === "AC"} />
        <Button label="()" onClick={() => handleInput(")")} styles="font-bold" isActive={activeKey === "(" || activeKey === ")"} />
        <Button label="%" onClick={() => handleInput("%")} styles="font-bold" isActive={activeKey === "%"} />
        <Button label="/" onClick={() => handleInput("/")} styles="font-bold" isActive={activeKey === "/"} />
        <Button label="7" onClick={() => handleInput("7")} isActive={activeKey === "7"} />
        <Button label="8" onClick={() => handleInput("8")} isActive={activeKey === "8"} />
        <Button label="9" onClick={() => handleInput("9")} isActive={activeKey === "9"} />
        <Button label="*" onClick={() => handleInput("*")} styles="font-bold" isActive={activeKey === "*"} />
        <Button label="4" onClick={() => handleInput("4")} isActive={activeKey === "4"} />
        <Button label="5" onClick={() => handleInput("5")} isActive={activeKey === "5"} />
        <Button label="6" onClick={() => handleInput("6")} isActive={activeKey === "6"} />
        <Button label="-" onClick={() => handleInput("-")} styles="font-bold" isActive={activeKey === "-"} />
        <Button label="1" onClick={() => handleInput("1")} isActive={activeKey === "1"} />
        <Button label="2" onClick={() => handleInput("2")} isActive={activeKey === "2"} />
        <Button label="3" onClick={() => handleInput("3")} isActive={activeKey === "3"} />
        <Button label="+" styles="font-bold" onClick={() => handleInput("+")} isActive={activeKey === "+"} />
        <Button label="0" onClick={() => handleInput("0")} isActive={activeKey === "0"} />
        <Button label="." onClick={() => handleInput(".")} styles="font-bold" isActive={activeKey === "."} />
        <Button label="DEL" onClick={() => handleInput("DEL")} styles="font-bold" isActive={activeKey === "DEL"} />
        <Button label="=" onClick={() => handleInput("=")} styles="font-bold" isActive={activeKey === "="} />
      </div>
    </>
  )
}

export default Calculator