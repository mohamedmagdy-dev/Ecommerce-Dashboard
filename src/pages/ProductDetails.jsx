import PageWrapper from "../components/PageWrapper";
import Slider from "../components/ui/Slider";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// Icons
import EditIcon from "@mui/icons-material/Edit";
import Rate from "../components/ui/Rate";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import clsx from "clsx";
import CustomerReviews from "../components/CustomerReviews";
export default function ProductDetails() {
  const [productData, setProductData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [showTap, setShowTap] = useState("Specification");
  useEffect(() => {
    async function productData() {
      try {
        const response = await axios.get("/Api/ProductDetailsData.json");
        setProductData(response.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(true);
        console.log(err);
      }
    }
    productData();
  }, []);

  return (
    <PageWrapper className="p-5">
      {!isLoading && (
        <div className="flex gap-10 relative bg-white dark:bg-[var(--color-primary-dark)] max-lg:flex-wrap p-5 rounded-sm">
          <Link
            to="/CreateProduct"
            className="absolute right-5 top-5 bg-[#f5f7fa] dark:bg-[#282b2e] rounded  px-2 py-1"
          >
            <EditIcon fontSize="" />
          </Link>
          <div className="relative">
            <Slider
              main={productData.images.main}
              thumbnails={productData.images.thumbnails}
            />
          </div>

          <div>
            {/* Product Tittle */}
            <h2 className=" text-xl text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] font-semibold">
              {productData.title}
            </h2>
            {/* Seller And Publish */}
            <div className="flex gap-5 my-5 text-sm">
              <span className="text-gray-400 ">
                Seller :{" "}
                <span className="text-[var(--color-primary-dark)] font-bold dark:text-[var(--color-text-500)]">
                  {productData.seller}
                </span>
              </span>
              <span className="text-gray-400 ">
                Published :{" "}
                <span className="text-[var(--color-primary-dark)] font-bold dark:text-[var(--color-text-500)]">
                  {productData.published}
                </span>
              </span>
            </div>
            {/* Rate */}
            <div className="flex gap-3 items-center mb-5">
              <Rate rate={productData.rating} />
              <span className="text-gray-500 text-sm">
                ({productData.reviewsCount} Customer Review )
              </span>
            </div>
            {/* Price  --- No Of Orders --  Stock  --- Revenue */}
            <div className="flex gap-5 items-center flex-wrap">
              <div className="flex gap-3 items-center p-3 text-sm rounded border border-dashed border-gray-300">
                <MonetizationOnOutlinedIcon
                  fontSize="small"
                  className="text-green-600"
                />
                <div className="flex  flex-col ">
                  <span className="text-gray-400">Price :</span>
                  <span className="text-[var(--color-primary-dark)] font-bold dark:text-[var(--color-text-500)]">
                    ${productData.price}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 items-center p-3 text-sm rounded border border-dashed border-gray-300">
                <BookmarksOutlinedIcon
                  fontSize="small"
                  className="text-green-600"
                />
                <div className="flex  flex-col ">
                  <span className="text-gray-400">No. of Orders :</span>
                  <span className="text-[var(--color-primary-dark)] font-bold dark:text-[var(--color-text-500)]">
                    ${productData.orders}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 items-center p-3 text-sm rounded border border-dashed border-gray-300">
                <DynamicFeedOutlinedIcon
                  fontSize="small"
                  className="text-green-600"
                />
                <div className="flex  flex-col ">
                  <span className="text-gray-400">Available Stocks :</span>
                  <span className="text-[var(--color-primary-dark)] font-bold dark:text-[var(--color-text-500)]">
                    ${productData.stock}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 items-center p-3 text-sm rounded border border-dashed border-gray-300">
                <DownloadOutlinedIcon
                  fontSize="small"
                  className="text-green-600"
                />
                <div className="flex  flex-col ">
                  <span className="text-gray-400">Total Revenue :</span>
                  <span className="text-[var(--color-primary-dark)] font-bold dark:text-[var(--color-text-500)]">
                    ${productData.revenue}
                  </span>
                </div>
              </div>
            </div>
            {/* Sizes ---- colors */}
            <div className="my-8 pr-5 flex gap-10 item-center justify-between flex-wrap">
              <div>
                <h3 className=" text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] font-semibold">
                  Sizes :
                </h3>
                <div className="flex gap-3 mt-3">
                  {productData.sizes.map((size, index) => {
                    return (
                      <button
                        key={index}
                        className={clsx(
                          "flex justify-center items-center text-sm w-8 h-8 cursor-pointer rounded-full text-[#405189] bg-[#e1e4ed] dark:bg-[#252a33]",
                          selectedSize === size && "!bg-[#405189] text-white"
                        )}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <h3 className=" text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] font-semibold">
                  Colors :
                </h3>
                <div className="flex gap-3 mt-3 flex-wrap">
                  {productData.colors.map((color, index) => {
                    return (
                      <button
                        key={index}
                        className={clsx(
                          "flex justify-center items-center cursor-pointer rounded-full border p-2 border-gray-200 dark:border-black  bg-white dark:bg-[#212529]",
                          selectedColor === color.code &&
                            "!border-black dark:!border-gray-200"
                        )}
                        onClick={() => setSelectedColor(color.code)}
                      >
                        <span
                          className={" w-4 h-4 rounded-full"}
                          style={{ backgroundColor: color.code }}
                        ></span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* Description */}
            <div>
              <h3 className=" text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] font-semibold">
                Description:
              </h3>
              <p className="text-sm text-gray-400 mt-3">
                {productData.description}
              </p>
            </div>
            {/* Features  ----  Services */}
            <div className="my-8 pr-5 flex gap-10 item-center justify-between flex-wrap">
              <div>
                <h3 className=" text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] font-semibold">
                  Features :
                </h3>
                <ul className="list-disc pl-5 text-sm">
                  {productData.features.map((feature, index) => {
                    return (
                      <li
                        className=" text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]"
                        key={index}
                      >
                        {feature}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <h3 className=" text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] font-semibold">
                  Services :
                </h3>
                <ul className="list-disc pl-5 text-sm">
                  {productData.services.map((service, index) => {
                    return (
                      <li
                        className=" text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]"
                        key={index}
                      >
                        {service}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            {/* Product Description */}
            <div className="mb-8">
              <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul
                  className="flex flex-wrap -mb-px text-sm font-medium text-center"
                  id="default-tab"
                  data-tabs-toggle="#default-tab-content"
                  role="tablist"
                >
                  <li className="me-2" role="presentation">
                    <button
                      className={clsx(
                        "inline-block p-4 rounded-t-lg border-b-2 border-transparent cursor-pointer duration-200 text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]",
                        showTap === "Specification"
                          ? " !border-green-500 text-green-500 "
                          : "hidden"
                      )}
                      id="Specification-tab"
                      data-tabs-target="#Specification"
                      type="button"
                      role="tab"
                      aria-controls="Specification"
                      aria-selected="false"
                      onClick={() => setShowTap("Specification")}
                    >
                      Specification
                    </button>
                  </li>
                  <li className="me-2" role="presentation">
                    <button
                      className={clsx(
                        "inline-block p-4 rounded-t-lg border-b-2 border-transparent cursor-pointer duration-200 text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]",
                        showTap === "Details"
                          ? " !border-green-500 text-green-500 "
                          : "hidden"
                      )}
                      id="Details-tab"
                      data-tabs-target="#Details"
                      type="button"
                      role="tab"
                      aria-controls="Details"
                      aria-selected="false"
                      onClick={() => setShowTap("Details")}
                    >
                      Details
                    </button>
                  </li>
                </ul>
              </div>
              <div id="default-tab-content">
                <div
                  className={clsx(
                    " p-4 rounded-lg bg-gray-50 dark:bg-gray-800",
                    showTap === "Specification" ? "block " : "hidden"
                  )}
                  id="Specification"
                  role="tabpanel"
                  aria-labelledby="Specification-tab"
                >
                  <p className="text-sm text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]">
                    {productData.productDescription.specification.description}
                  </p>
                </div>
                <div
                  className={clsx(
                    "hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800",
                    showTap === "Details" && "!block"
                  )}
                  id="Details"
                  role="tabpanel"
                  aria-labelledby="Details-tab"
                >
                  <p className="text-sm text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]">
                    {productData.productDescription.details.description}
                  </p>
                </div>
              </div>
            </div>
            {/* Ratings & Reviews */}
            <CustomerReviews
              RateObj={productData.ratings}
              loading={isLoading}
            />
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
