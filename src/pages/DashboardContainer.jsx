// components
import { useState } from "react";
import ApplicationBar from "../components/ApplicationBar";
import Navigator from "../components/Navigator";

export default function DashboardLayoutBasic({ children }) {
  const [collapseMenu, setCollapseMenu] = useState(false);

  function handleCollapseMenu() {
    setCollapseMenu((prev) => !prev);
  }
  return (
    <div className="flex">
      <Navigator collapseMenu={collapseMenu} />
      <div className="grow">
        <ApplicationBar
          handleCollapseMenu={handleCollapseMenu}
          collapseMenu={collapseMenu}
        />
        <div>{children}</div>
      </div>
    </div>
  );
}
