// components
import { useState } from "react";
import ApplicationBar from "../components/ApplicationBar";
import Navigator from "../components/Navigator";

export default function DashboardLayoutBasic({ children }) {
  const [collapseMenu, setCollapseMenu] = useState(false);

  function handelCollapseMenu() {
    setCollapseMenu((prev) => !prev);
  }
  return (
    <div className="flex">
      <Navigator collapseMenu={collapseMenu} />
      <div className="grow">
        <ApplicationBar handelCollapseMenu={handelCollapseMenu} />
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}
