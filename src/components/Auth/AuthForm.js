/*
Redudex is used to handle the sate 
this code is used to handle the login issue of any web application 
1-The email is validated and password together 
2-the data is fetched and requested by using Axios Library 
3- the user name is stored in dataBase mongo DB cluster 
4-the system shows error of password validation and use name
5- the (forgot passwored bottom is working) by sending a reset confermation code to the user


*/

import { useState, useEffect } from "react";
import GooleLogin from "react-google-login";
import classes from "./AuthForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store/Login-Slice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import useInput from "./use-input-validator.js";
import ErrorHandler from "../ErrorHandler/ErrorPage";

const AuthForm = () => {
  /////  Redux store is used to handel the validation of user name and password ///
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
    hasError: passwordInputHasError,
    valueInputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    rest: restPasswordInput,
  } = useInput((value) => value.trim() !== "");

  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmited, setIsSubmited] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const isError = useSelector((state) => state.login.isError);

  let formIsValid = false;
  if (enteredPasswordIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  ///// google login handler ////////////

  const handleGoogleLogin = async (googleData) => {
    axios
      .post("http://localhost:4000/app/googlelogin", {
        tokenId: googleData.tokenId,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(loginActions.login());
          localStorage.setItem("loginData", JSON.stringify(response.data));
          history.push("/profile");
        } else {
          history.push("/");
        }
      });
  };
  const handleFailer = (resulte) => {
    alert(resulte);
  };
  ///// useEffect is ued to hande the request from backend  ////////////

  useEffect(() => {
    let didCancel = false;

    const fecthdata = async () => {
      if (isSubmited) {
        try {
          const fetchData = await axios.post(
            "http://localhost:4000/app/login",
            {
              email: enteredEmail,
              password: enteredPassword,
            }
          );

          if (fetchData.data.auth) {
            dispatch(loginActions.login());
            history.replace("/profile");
            restPasswordInput();
            restemailInput();
          } else {
            setErrorMessage(fetchData.data.messeg);
            dispatch(loginActions.isError());

            history.replace("/profile");
          }
        } catch (error) {
          dispatch(loginActions.isError());
          restPasswordInput();
          restemailInput();
        }
      }
    };
    fecthdata();
    setIsSubmited(false);
    restPasswordInput();
    restemailInput();

    return () => {
      setIsSubmited(false);
    };
  }, [isSubmited]);

  ///// submit handeler of the forme  /////
  const submitHandler = (event) => {
    event.preventDefault();
    if (!enteredEmailIsValid) {
      return;
    }
    restemailInput();
    restPasswordInput();
  };
  ///// switch between pageds handler ////////////

  const switchAuthModeHandler = () => {
    dispatch(loginActions.loginSignUp());
  };
  ///// the main login handler ////////////

  const normalLoginHandler = (event) => {
    event.preventDefault();

    setIsSubmited(true);
  };
  ///// error window handler  ////////////

  const errorHandlerWindo = () => {
    dispatch(loginActions.isError());
  };
  ///// used to protect the passwerd rest page ////////////

  const restPaswwordhandler = () => {
    dispatch(loginActions.passwordIsRest());
    history.push("/RestPage");
  };

  ///// main html code ////////////

  return (
    <div>
      <div>
        {isError && (
          //// error window ////
          <ErrorHandler
            title={"An error Occured!"}
            message={errorMessage}
            onConfirm={errorHandlerWindo}
          />
        )}
      </div>
      <section className={classes.auth}>
        <h1> LOGIN</h1>

        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <input
              type="email"
              id="email"
              placeholder="Username or Email"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={enteredEmail}
              required
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
            {passwordInputHasError && (
              <p className={classes.errortext}>Password must not be empty.</p>
            )}
          </div>
          <div className={classes.actions}>
            <button disabled={!formIsValid} onClick={normalLoginHandler}>
              Login
            </button>
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              Create a new account
            </button>
            <button
              className={classes.actions}
              type="button"
              className={classes.forgotpass}
              onClick={restPaswwordhandler}
            >
              Forget Password ?
            </button>
          </div>
          <div>
            <GooleLogin
              clientId={process.env.REACT_APP_GOOGLE_ClIENT_ID}
              onSuccess={handleGoogleLogin}
              onFailure={handleFailer}
              cookiePolicy={"single_host_origin"}
              buttonText="Login with Google"
            ></GooleLogin>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AuthForm;
