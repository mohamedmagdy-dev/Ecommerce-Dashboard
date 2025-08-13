import { configureStore } from "@reduxjs/toolkit";
// Reducers
import userReducer from "./features/user/userSlicer";
import themeReducer from "./features/theme/themeSlicer";
export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
});
