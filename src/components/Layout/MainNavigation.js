import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../store/Login-Slice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogin = useSelector((state) => state.login.isLogin);

  const logoutHandelr = () => {
    //dispatch(loginActions.loginSignUp());
    // dispatch(loginActions.isSentEmail());
    dispatch(loginActions.login());
    history.push("/");

    localStorage.removeItem("loginData");
    localStorage.removeItem("state");
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/auth">Login</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          {isLogin && (
            <li>
              <button onClick={logoutHandelr}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
