import clsx from "clsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

// Icons
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import { Button } from "./ui/Buttons";

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

  function Cards() {
    return (
      <div className="flex justify-between gap-8 flex-wrap mb-5">
        <StatueCard
          title="Total Earnings"
          rate={statueInfo.totalEarnings.rate}
          total={statueInfo.totalEarnings.total}
          route="/"
          routeTitle="View net earnings"
          isMoney={true}
        >
          <Button color="green">
            <AttachMoneyIcon />
          </Button>
        </StatueCard>
        <StatueCard
          title="Orders"
          rate={statueInfo.orders.rate}
          total={statueInfo.orders.total}
          route="/"
          routeTitle="View all orders"
        >
          <Button color="blue">
            <ShoppingBagOutlinedIcon />
          </Button>
        </StatueCard>
        <StatueCard
          title="Customers"
          rate={statueInfo.customers.rate}
          total={statueInfo.customers.total}
          route="/"
          routeTitle="See details"
        >
          <Button color="orange">
            <AccountCircleOutlinedIcon />
          </Button>
        </StatueCard>
        <StatueCard
          title="My Balance"
          rate={statueInfo.myBalance.rate}
          total={statueInfo.myBalance.total}
          route="/"
          routeTitle="Withdraw money"
          isMoney={true}
        >
          <Button color="purple">
            <CreditCardOutlinedIcon />
          </Button>
        </StatueCard>
      </div>
    );
  }

  return <>{!isLoading && <Cards />}</>;
}

export function StatueCard({
  title,
  rate,
  total,
  route,
  routeTitle,
  isMoney = false,
  children,
}) {
  return (
    <div className="p-3  min-h-[140px] shadow-sm flex flex-col justify-between  rounded bg-white dark:bg-[var(--color-primary-dark)] grow">
      <span className="flex justify-between items-center">
        <span className="text-[var(--color-text-800)] uppercase text-sm font-se">
          {title}
        </span>
        <span
          className={clsx(
            rate > 0
              ? "text-[var(--color-green)]"
              : "text-[var(--color-orange)]"
          )}
        >
          <ImportExportIcon fontSize="" />
          {rate}
        </span>
      </span>
      <span className="text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  mt-3 font-bold text-2xl ">
        {!!isMoney && "$"}
        {total}
        {!!isMoney && "K"}
      </span>
      <div className="flex justify-between items-end text-sm underline text-[var(--color-text-900)] dark:text-[var(--color-text-500)] ">
        <Link to={route}>{routeTitle}</Link>
        {children}
      </div>
    </div>
  );
}
