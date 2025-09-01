// components
import LayoutRightSide from "../components/LayoutRightSide";
import DatePicker from "../components/ui/DatePicker";
import { Button } from "../components/ui/Buttons";
import PageWrapper from "../components/PageWrapper";
import StatueCards from "../components/StatueCards";
import BestSellingProducts from "../components/BestSellingProducts";
import TopSellers from "../components/TopSellers";
import VisitsSource from "../components/VisitsSource";
import RevenueChart from "../components/RevenueChart";

// Icons
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import MicrowaveIcon from "@mui/icons-material/Microwave";
import { useState } from "react";
// React Router
import { Link } from "react-router-dom";
import SellsMap from "../components/SellsMap";
import RecentOrders from "../components/RecentOrders";

export default function Home() {
  const [toggleRightMenu, setToggleRightMenu] = useState(false);

  function toggleRMenuFun() {
    setToggleRightMenu((prev) => !prev);
  }

  return (
    <PageWrapper className="min-[1170px]:flex w-full">
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
              <Link to="/createProducts">
                <Button
                  title="Add Product"
                  color="green"
                  style="cursor-pointer"
                >
                  <LibraryAddIcon fontSize="" />
                </Button>
              </Link>
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
        <div className="flex max-xl:flex-wrap justify-between max-lg:flex-col gap-5 mb-5 overflow-hidden">
          <RevenueChart />
          <SellsMap />
        </div>
        {/* Row 4 */}

        <div className="grid grid-cols-2 max-lg:grid-cols-1  gap-5 mb-5">
          <BestSellingProducts />
          <TopSellers />
        </div>
        {/* Row 5 */}
        <div className="grid grid-cols-2 max-lg:grid-cols-1  gap-5 mb-5">
          <VisitsSource />
          
            <RecentOrders />
        
        </div>
      </div>
      <LayoutRightSide
        toggleRightMenu={toggleRightMenu}
        toggleRMenuFun={toggleRMenuFun}
      />
    </PageWrapper>
  );
}
