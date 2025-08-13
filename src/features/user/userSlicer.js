import { createSlice } from "@reduxjs/toolkit";

const userSlicer = createSlice({
  name: "user",
  initialState: {
    user: { name: "Mego" },
    isAuth: false,
  },
  reducers: {
    login: (state) => {
      console.log(state.isAuth);
    },
  },
});

export const { login } = userSlicer.actions;
export default userSlicer.reducer;
