import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../features/theme/themeSlicer";
import SunnyIcon from "@mui/icons-material/Sunny";
import BrightnessMediumIcon from "@mui/icons-material/BrightnessMedium";
export default function DarkModeToggle() {
  const { themeMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleMode())}
      className="cursor-pointer absolute z-10 bottom-7  right-7 w-8 h-8 flex justify-center items-center rounded-full shadow-sm"
      style={{
        backgroundColor:
          themeMode === "dark"
            ? "var(--color-primary-dark)"
            : "var(--color-primary-light)",
      }}
    >
      {themeMode === "light" ? (
        <SunnyIcon fontSize="small" className="text-white" />
      ) : (
        <BrightnessMediumIcon fontSize="small" className="text-white" />
      )}
    </button>
  );
}
