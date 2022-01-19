import AuthForm from "../Auth/AuthForm";
import RegForm from "../Auth/RegForm";
import OpenEmail from "../UserConfrmation/OpenEmail";
import { useSelector } from "react-redux";
const StartingPageContent = () => {
  const loginSignUp = useSelector((state) => state.login.loginSignUp);
  const isSentEmail = useSelector((state) => state.login.isSentEmail);

  const authForms = loginSignUp ? <AuthForm /> : <RegForm />;
  return !isSentEmail ? authForms : <OpenEmail />;

  //
};

export default StartingPageContent;
