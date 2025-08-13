import { createSlice } from "@reduxjs/toolkit";

const themeSlicer = createSlice({
  name: "theme",
  initialState: {
    themeMode: "light",
  },
  reducers: {
    toggleMode: (state) => {
      state.themeMode = state.themeMode === "light" ? "dark" : "light";
    },
  },
});

export const { toggleMode } = themeSlicer.actions;
export default themeSlicer.reducer;
