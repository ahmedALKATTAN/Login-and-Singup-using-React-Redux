import classes from "./ProfileForm.module.css";
import useInput from "../Auth/use-input-validator";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store/Login-Slice";
import axios from "axios";
import { useState } from "react";
import ErrorHandler from "../ErrorHandler/ErrorPage";

const ProfileForm = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const isError = useSelector((state) => state.login.isError);
  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueInputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    rest: restEmail,
  } = useInput((value) => value.includes("@"));
  const dispach = useDispatch();

  let formIsValid = false;
  if (emailIsValid) {
    formIsValid = true;
  }

  const errorHandlerWindo = () => {
    dispach(loginActions.isError());
  };
  ///// useEffect is ued to hande the request from backend  ////////////
  const handlesendRestEmail = () => {
    axios.post("http://localhost:4000/app/resetPassword", {
      email: email,
    });
    dispach(loginActions.passwordIsAuth());
    dispach(loginActions.passwordIsRest());
    restEmail();
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
          <label htmlFor="new-password">Enter your Email</label>
          <input
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={email}
            type="email"
            id="new-password"
          />
          {emailHasError && (
            <p className={classes.errortext}>Email must not be empty.</p>
          )}
        </div>
        <div className={classes.action}>
          <button disabled={!emailIsValid} onClick={handlesendRestEmail}>
            Sent Rest Email
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
