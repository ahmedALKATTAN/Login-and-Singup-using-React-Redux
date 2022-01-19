import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import ProfilePage from "./pages/ProfilePage";
import RestPage from "./pages/ResetPassword";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import RestPasswordForm from "./components/Profile/enterRestPass";

function App() {
  const isLogin = useSelector((state) => state.login.isLogin);
  const passwordIsRest = useSelector((state) => state.login.passwordIsRest);
  const passwordIsAuth = useSelector((state) => state.login.passwordIsAuth);
  window.addEventListener("close", () =>
    localStorage.removeItem("applicationState")
  );

  return (
    <Layout>
      <Switch>
        {!isLogin && (
          <Route path="/" exact>
            <HomePage />
          </Route>
        )}
        {isLogin && (
          <Route path="/profile">
            <ProfilePage />
          </Route>
        )}

        {passwordIsRest && (
          <Route path="/RestPage">
            <RestPage />
          </Route>
        )}
        {passwordIsAuth && (
          <Route path="/RestPasswordForm">
            <RestPasswordForm />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
