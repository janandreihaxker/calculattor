import React, { useState } from 'react';
import './App.css';

function CalcDisplay({ dispValue }) {
  return <div className="CalcDisplay">{dispValue}</div>;
}

function CalcButton({
  label,
  buttonClassName = 'CalcButton',
  onClick,
}) {
  return (
    <button
      className={buttonClassName}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
}

function App() {
  const [disp, setDisp] = useState('0');
  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondNumber, setWaitingForSecondNumber] = useState(false);

  const onClickHandler = (value) => {
    // Clear
    if (value === 'C') {
      setDisp('0');
      setFirstNumber(null);
      setOperator(null);
      setWaitingForSecondNumber(false);
      return;
    }

    // Numbers
    if (!isNaN(value)) {
      if (disp === '0' || waitingForSecondNumber) {
        setDisp(value);
        setWaitingForSecondNumber(false);
      } else {
        setDisp(disp + value);
      }
      return;
    }

    // Operators
    if (['+', '-', '*', '÷'].includes(value)) {
      setFirstNumber(Number(disp));
      setOperator(value);
      setWaitingForSecondNumber(true);
      return;
    }

    // Equals
    if (value === '=') {
      if (firstNumber === null || operator === null) {
        return;
      }

      const secondNumber = Number(disp);
      let result;

      if (operator === '+') {
        result = firstNumber + secondNumber;
      } else if (operator === '-') {
        result = firstNumber - secondNumber;
      } else if (operator === '*') {
        result = firstNumber * secondNumber;
      } else if (operator === '÷') {
        if (secondNumber === 0) {
          setDisp('Error');
          setFirstNumber(null);
          setOperator(null);
          setWaitingForSecondNumber(true);
          return;
        }

        result = firstNumber / secondNumber;
      }

      setDisp(String(result));
      setFirstNumber(null);
      setOperator(null);
      setWaitingForSecondNumber(true);
    }
  };

  return (
    <div className="App">
      <div className="Header">
        Calculator of Jan Andrei G. Teresa - DA3A
      </div>

      <div className="Calculator">
        <CalcDisplay dispValue={disp} />

        <div className="CalcGrid">
          <CalcButton label="7" onClick={onClickHandler} />
          <CalcButton label="8" onClick={onClickHandler} />
          <CalcButton label="9" onClick={onClickHandler} />
          <CalcButton label="÷" onClick={onClickHandler} />

          <CalcButton label="4" onClick={onClickHandler} />
          <CalcButton label="5" onClick={onClickHandler} />
          <CalcButton label="6" onClick={onClickHandler} />
          <CalcButton label="*" onClick={onClickHandler} />

          <CalcButton label="1" onClick={onClickHandler} />
          <CalcButton label="2" onClick={onClickHandler} />
          <CalcButton label="3" onClick={onClickHandler} />
          <CalcButton label="-" onClick={onClickHandler} />

          <CalcButton
            label="C"
            buttonClassName="ClearButton"
            onClick={onClickHandler}
          />

          <CalcButton label="0" onClick={onClickHandler} />
          <CalcButton label="+" onClick={onClickHandler} />
          <CalcButton label="=" onClick={onClickHandler} />
        </div>
      </div>
    </div>
  );
}

export default App;