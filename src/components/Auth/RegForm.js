/*
Redudex is used to handle the new account  
this code is used to handle the signup issue of any web application 
1-The email , password  and name are validated together and sent error validation messge 
2-the  requested in data base MongoDB cluster 


*/

import classes from "./AuthForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store/Login-Slice";
import ErrorHandler from "../ErrorHandler/ErrorPage";
import { useEffect, useState } from "react";

import axios from "axios";
import useInput from "./use-input-validator.js";

const RegForm = () => {
  /////  Redux store is used to handel the validation of user name and password ///
  const {
    value: enterName,
    hasError: enterdNameHasError,
    rest: restName,
    isValid: enteredNameIsValid,
    valueInputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBulurHandler,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueInputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    rest: restemailInput,
  } = useInput((value) => value.includes("@"));
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: PasswordInputHasError,
    valueInputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    rest: restPasswordInput,
  } = useInput((value) => value.trim() !== "");
  const [errorMessage, setErrorMessage] = useState("");
  ///// used to handle the form validation in buttoms
  let formIsValid = false;
  if (enteredNameIsValid && enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }
  const [isSubmited, setIsSubmited] = useState(false);
  const isError = useSelector((state) => state.login.isError);
  ///// useEffect is ued to hande the request from backend  ////////////
  useEffect(() => {
    let didCancel = false;

    const fechData = async () => {
      if (isSubmited) {
        try {
          const fetchData = await axios.post(
            "http://localhost:4000/app/signup",
            {
              email: enteredEmail,
              password: enteredPassword,
              name: enterName,
            }
          );

          if (fetchData.data.seccess) {
            dispatch(loginActions.loginSignUp());
            dispatch(loginActions.isSentEmail());
          } else {
            dispatch(loginActions.isError());
            setErrorMessage(fetchData.data.messeg);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fechData();
    setIsSubmited(false);
    restName();
    restPasswordInput();
    restemailInput();
    return () => {
      // didCancel = true;
      setIsSubmited(false);
    };
  }, [isSubmited]);
  ///// submit handeler of the forme  /////

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsSubmited(true);
    if (
      !enteredNameIsValid ||
      !enteredEmailIsValid ||
      !enteredPasswordIsValid
    ) {
      return;
    }
  };
  const dispatch = useDispatch();
  ///// switch between pageds handler ////////////

  const switchAuthModeHandler = () => {
    dispatch(loginActions.loginSignUp());
  };
  ///// error window handler  ////////////

  const errorHandlerWindo = () => {
    dispatch(loginActions.isError());
    console.log("test2");
  };

  return (
    <div>
      <div>
        {isError && (
          <ErrorHandler
            title={"An error Occured!"}
            message={errorMessage}
            onConfirm={errorHandlerWindo}
          />
        )}
      </div>
      <section className={classes.auth}>
        <h1>Sign Up</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <input
              type="text"
              id="name"
              required
              placeholder="Name"
              onChange={nameChangeHandler}
              onBlur={nameBulurHandler}
              value={enterName}
            />
            {enterdNameHasError && (
              <p className={classes.errortext}>Name must not be empty.</p>
            )}
          </div>
          <div className={classes.control}>
            <input
              type="email"
              id="email"
              required
              placeholder="Email"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={enteredEmail}
            />
            {emailInputHasError && (
              <p className={classes.errortext}>Email must not be empty.</p>
            )}
          </div>

          <div className={classes.control}>
            <input
              type="password"
              id="password"
              required
              placeholder="Password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              value={enteredPassword}
            />
            {PasswordInputHasError && (
              <p className={classes.errortext}>Password must not be empty.</p>
            )}
          </div>
          <div className={classes.actions}>
            <button disabled={!formIsValid}>Create Account</button>
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              Login with existing account
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default RegForm;
