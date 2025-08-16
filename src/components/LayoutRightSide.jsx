import clsx from "clsx";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import RecentActivity from "./RecentActivity";
import TopCategories from "./TopCategories";
import H3 from "./ui/Titles";
export default function LayoutRightSide({ toggleRightMenu, toggleRMenuFun }) {
  const layoutStyle = clsx(
    "p-3 shadow-sm max-md:w-[calc(100%-54px)] min-md:min-w-[240px] min-md:max-w-[240px] border-l border-white dark:border-[#94a3d465] overflow-y-auto bg-white fixed dark:bg-[var(--color-primary-dark)] min-md:sticky max-md:min-h-screen min-md:top-0 right-0 duration-200 max-md:transform max-md:translate-x-[100%] ",
    toggleRightMenu && "!translate-x-[0] "
  );

  function SideLayout() {
    return (
      <div className={layoutStyle}>
        {/* Close Button */}
        <button
          className="cursor-pointer min-md:hidden mb-5 dark:text-[var(--color-text-500)]"
          onClick={() => toggleRMenuFun()}
        >
          <CloseOutlinedIcon fontSize="small" />
        </button>
        <H3 title="Recent Activity" />
        <RecentActivity />
        <H3 title="Top 10 Categories" />
        <TopCategories />
      </div>
    );
  }

  return <>{toggleRightMenu && <SideLayout />}</>;
}
