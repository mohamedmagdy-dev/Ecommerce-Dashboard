import SunnyIcon from "@mui/icons-material/Sunny";
import BrightnessMediumIcon from "@mui/icons-material/BrightnessMedium";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../features/theme/themeSlicer";
export default function DarkModeToggle() {
  const { themeMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleMode())}
      className="cursor-pointer absolute z-10 bottom-7  right-7 w-8 h-8 flex justify-center items-center rounded-full shadow-sm"
      style={{ background: themeMode === "dark" ? "#212529" : "#41528a" }}
    >
      {themeMode === "light" ? (
        <SunnyIcon fontSize="small" className="text-white" />
      ) : (
        <BrightnessMediumIcon fontSize="small" className="text-white" />
      )}
    </button>
  );
}
