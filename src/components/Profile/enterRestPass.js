/*
in this code used to handel the enter paswerd page 
1-passwored validation is applied to the input before submition 
2- the data is fetched and requested by using Axios Library


*/

import classes from "./ProfileForm.module.css";
import useInput from "../Auth/use-input-validator";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store/Login-Slice";
import axios from "axios";
import { useState } from "react";
import ErrorHandler from "../ErrorHandler/ErrorPage";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const RestPasswordForm = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const isError = useSelector((state) => state.login.isError);
  const history = useHistory();
  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueInputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    rest: restPassword,
  } = useInput((value) => value.trim() !== "");
  const dispach = useDispatch();
  let formIsValid = false;
  if (passwordIsValid) {
    formIsValid = true;
  }
  const errorHandlerWindo = () => {
    dispach(loginActions.isError());
  };

  ///// useEffect is ued to hande the request from backend  ////////////
  const handlesendRestedPassword = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:4000/app/sendResetpassword", {
        password,
      });
      dispach(loginActions.passwordIsRest());

      restPassword();
      history.push("/");
    } catch (error) {
      console.log("error");
    }
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
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="new-password">Enter New Password</label>
          <input
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={password}
            type="password"
            id="new-password"
          />
          {passwordHasError && (
            <p className={classes.errortext}>Password must not be empty.</p>
          )}
        </div>
        <div className={classes.action}>
          <button disabled={!formIsValid} onClick={handlesendRestedPassword}>
            Sent New password
          </button>
        </div>
      </form>
    </div>
  );
};

export default RestPasswordForm;
