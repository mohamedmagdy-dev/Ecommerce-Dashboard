// React
import { useState } from "react";

// components
import ApplicationBar from "../components/ApplicationBar";
import Navigator from "../components/Navigator";

export default function DashboardLayoutBasic() {
  return (
    <>
      <ApplicationBar />
      <Navigator />
    </>
  );
}
