import clsx from "clsx";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import RecentActivity from "./RecentActivity";
import TopCategories from "./TopCategories";
import H3 from "./ui/Titles";
import ProductReviews from "./ProductReviews";
import CustomerReviews from "./CustomerReviews";
import ReferBox from "./ReferBox";
import { useState, useEffect } from "react";
import axios from "axios";
export default function LayoutRightSide({ toggleRightMenu, toggleRMenuFun }) {
  const layoutStyle = clsx(
    " max-sm:w-[calc(100%-54px)] max-h-[calc(100vh-52px)]  dark:border-[#94a3d465] dark:bg-[var(--color-primary-dark)] overflow-y-auto bg-white border-l border-white shadow-sm  max-md:!top-[52px] min-lg:min-w-[300px] min-lg:max-w-[300px] fixed right-0 top-[64px]  bg-white dark:bg-[var(--color-primary-dark)] px-5 pt-3 pb-8"
  );

  const [rate, setRate] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axios.get("/Api/reviewsSummary.json");
        setRate(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(true);
      }
    }
    getCategories();
  }, []);

  function SideLayout() {
    return (
      <div className={layoutStyle}>
        {/* Close Button */}
        <button
          className="cursor-pointer  dark:text-[var(--color-text-500)]"
          onClick={() => toggleRMenuFun()}
        >
          <CloseOutlinedIcon fontSize="small" />
        </button>
        <H3 title="Recent Activity" />
        <RecentActivity />
        <H3 title="Top 10 Categories" />
        <TopCategories />
        <H3 title="Products Reviews" />
        <ProductReviews />
        <H3 title="Customer Reviews" />
        <CustomerReviews RateObj={rate} loading={isLoading} />
        <ReferBox />
      </div>
    );
  }

  return <>{toggleRightMenu && <SideLayout />}</>;
}
