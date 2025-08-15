import clsx from "clsx";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
// Icons

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
export function StatueCard({
  title,
  rate,
  total,
  route,
  routeTitle,
  color,
  children,
}) {
  return (
    <div className="p-3 shadow-sm flex flex-col justify-between items-center rounded bg-white dark:bg-[var(--color-primary-dark)]">
      <span className="flex justify-between items-center">
        <span className="text-[var(--color-text-800)]">{title}</span>
        <span
          className={clsx(
            rate < 0
              ? "text-[var(--color-green)]"
              : "text-[var(--color-orange)]"
          )}
        >
          <ImportExportIcon fontSize="" />
          {rate}
        </span>
      </span>
      <span className="text-[var(--color-primary-dark)]">{total}</span>
      <Link to={route}>{routeTitle}</Link>
      <div
        className={clsx(
          "w-[40px] h-[40px] rounded flex items-center justify-center",
          color === "blue" &&
            "text-[var(--color-blue)]  hover:bg-[var(--color-blue)] hover:text-white bg-[var(--color-lightBlue)]"
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default function StatueCards() {
  const [statueInfo, setStatueInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getStatusInfo() {
      try {
        const response = await axios.get("/Api/summaryStats.json");
        setStatueInfo(response.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(true);

        console.log(err);
      }
    }
    getStatusInfo();
  }, []);

  return (
    <div>
      {!isLoading && (
        <StatueCard
          title="Total Earnings"
          rate={statueInfo.totalEarnings.rate}
          total={statueInfo.totalEarnings.total}
          route="/"
          routeTitle="View net earnings"
          color="blue"
        >
          <AttachMoneyIcon fontSize="" />
        </StatueCard>
      )}
    </div>
  );
}
