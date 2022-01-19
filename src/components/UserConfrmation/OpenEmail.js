/*
Redudex is used to handle the sate 
this code is used to handle a messge after sendinf confermaton email  



*/
import classes from "./OpenEmail.module.css";
import { useDispatch } from "react-redux";
import { loginActions } from "../store/Login-Slice";
const OpenEmail = () => {
  const dispatch = useDispatch();

  const handlLogin = (event) => {
    dispatch(loginActions.isSentEmail());
  };

  return (
    <section className={classes.auth}>
      <h1>Conframation Email is sent!</h1>
      <p className={classes.confmStyle}>
        User was registred successfully!Please check your email
      </p>
      <button onClick={handlLogin}>Please Login</button>
    </section>
  );
};

export default OpenEmail;
