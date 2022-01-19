/*
custum hook is appliyed to input validation 


*/

import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const ValueIsValid = validateValue(enteredValue);
  const hasError = !ValueIsValid && isTouched;

  const valueInputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const rest = () => {
    setEnteredValue("");
    setIsTouched(false);
  };
  return {
    value: enteredValue,
    hasError,
    rest,
    isValid: ValueIsValid,
    valueInputChangeHandler,
    inputBlurHandler,
  };
};

export default useInput;
