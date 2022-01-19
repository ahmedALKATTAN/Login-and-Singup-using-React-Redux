import { createSlice } from "@reduxjs/toolkit";
const loginInitalState = {
  isLogin: false,
  loginSignUp: true,
  isSentEmail: false,
  isError: false,
  passwordIsRest: false,
  passwordIsAuth: false,
};

// the method below is use to mang the sates
const loginSlice = createSlice({
  name: "login",
  initialState: loginInitalState,
  reducers: {
    login(state) {
      state.isLogin = !state.isLogin;
    },
    loginSignUp(state) {
      state.loginSignUp = !state.loginSignUp;
    },
    isSentEmail(state) {
      state.isSentEmail = !state.isSentEmail;
    },
    isError(state) {
      state.isError = !state.isError;
    },
    passwordIsRest(state) {
      state.passwordIsRest = !state.passwordIsRest;
    },
    passwordIsAuth(state) {
      state.passwordIsAuth = true;
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice;
