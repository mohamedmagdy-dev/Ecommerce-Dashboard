import { createSlice } from "@reduxjs/toolkit";

const themeSlicer = createSlice({
  name: "theme",
  initialState: {
    themeMode: "light",
  },
  reducers: {
    toggleMode: (state) => {
      document.getElementsByTagName("html")[0].classList.toggle("dark");
      state.themeMode = state.themeMode === "light" ? "dark" : "light";
    },
  },
});

export const { toggleMode } = themeSlicer.actions;
export default themeSlicer.reducer;
