import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import loginSlice from "./Login-Slice";

//// use local storg to store th e sate
const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem("applicationState", JSON.stringify(getState()));
    return result;
  };
};
const reHydrateStore = () => {
  if (localStorage.getItem("applicationState") !== null) {
    return JSON.parse(localStorage.getItem("applicationState"));
    // re-hydrate the store
  }
};

// export the store
const store = configureStore({
  reducer: { login: loginSlice.reducer },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
