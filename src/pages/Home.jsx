// redux
import { useSelector } from "react-redux";
// components
import LayoutRightSide from "../components/LayoutRightSide";
import DatePicker from "../components/ui/DatePicker";
import { Button } from "../components/ui/Buttons";
import PageWrapper from "../components/PageWrapper";
import StatueCards from "../components/StatueCards";
// Icons
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import MicrowaveIcon from "@mui/icons-material/Microwave";
import { useEffect, useState } from "react";

export default function Home() {

  const [toggleRightMenu, setToggleRightMenu] = useState(false);
  function toggleRMenuFun() {
    setToggleRightMenu((prev) => !prev);
  }


  return (
    <PageWrapper className="flex">
      <div className="p-5 grow">
        {/* Row 1*/}
        <div className="flex justify-between flex-wrap gap-5 mb-5">
          {/* Hello Text */}
          <div>
            <h2 className="text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] font-bold">
              Good Morning, Anna!
            </h2>
            <p className="text-sm text-[var(--color-text-800)]">
              Here's what's happening with your store today.
            </p>
          </div>
          {/* Action Button */}
          <div className="flex items-center gap-5 flex-wrap ">
            <DatePicker />
            <div className="flex gap-5">
              <Button title="Add Product" color="green" style="cursor-pointer">
                <LibraryAddIcon fontSize="" />
              </Button>
              <Button
                color="blue"
                style="cursor-pointer"
                onClick={toggleRMenuFun}
              >
                <MicrowaveIcon fontSize="small" />
              </Button>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <StatueCards />
        {/* Row 3 */}
      </div>
      <LayoutRightSide
        toggleRightMenu={toggleRightMenu}
        toggleRMenuFun={toggleRMenuFun}
      />
    </PageWrapper>
  );
}
