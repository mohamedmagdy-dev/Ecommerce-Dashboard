// Redux
import { useDispatch, useSelector } from "react-redux";

import { toggleMode } from "../features/theme/themeSlicer";
// icons
import SunnyIcon from "@mui/icons-material/Sunny";
import BrightnessMediumIcon from "@mui/icons-material/BrightnessMedium";
import clsx from "clsx";

export default function DarkModeToggle() {
  const { themeMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleMode())}
      className={clsx(
        "cursor-pointer fixed z-10 bottom-7 dark:border dark:border-white  right-7 w-8 h-8 flex justify-center items-center rounded-full shadow-sm",
        themeMode === "dark"
          ? "bg-[var(--color-primary-dark)]"
          : "bg-[var(--color-primary-light)]"
      )}
    >
      {themeMode === "light" ? (
        <SunnyIcon fontSize="small" className="text-white" />
      ) : (
        <BrightnessMediumIcon fontSize="small" className="text-white" />
      )}
    </button>
  );
}
