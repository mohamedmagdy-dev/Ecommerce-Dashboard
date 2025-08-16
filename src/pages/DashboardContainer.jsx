// components
import { useState } from "react";
import ApplicationBar from "../components/ApplicationBar";
import Navigator from "../components/Navigator";
import Footer from "../components/Footer";
import clsx from "clsx";

export default function DashboardLayoutBasic({ children }) {
  const [collapseMenu, setCollapseMenu] = useState(false);

  function handleCollapseMenu() {
    setCollapseMenu((prev) => !prev);
  }
  return (
    <div className="flex">
      <Navigator collapseMenu={collapseMenu} />
      <div
        className={clsx(
          "grow ml-[54px] min-md:ml-[240px]",
          collapseMenu && "!ml-[54px]"
        )}
      >
        <ApplicationBar
          handleCollapseMenu={handleCollapseMenu}
          collapseMenu={collapseMenu}
        />
        <div>{children}</div>
        <Footer />
      </div>
    </div>
  );
}
