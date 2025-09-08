// components
import Table from "../components/Tables";
import { Button } from "../components/ui/Buttons";
import PageWrapper from "../components/PageWrapper";
import OrderSummary from "../components/OrderSummary";
// Axios
import axios from "axios";
import { useEffect, useState } from "react";
// Icons
import StarIcon from "@mui/icons-material/Star";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import TakeoutDiningIcon from "@mui/icons-material/TakeoutDining";
import CarRepairOutlinedIcon from "@mui/icons-material/CarRepairOutlined";
import TwoWheelerOutlinedIcon from "@mui/icons-material/TwoWheelerOutlined";
import SportsMmaOutlinedIcon from "@mui/icons-material/SportsMmaOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import clsx from "clsx";
export default function OrderDetails() {
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(order);
  useEffect(() => {
    async function getOrder() {
      try {
        const response = await axios.get("/Api/OrderDetails.json");
        setOrder(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(true);
      }
    }

    getOrder();
  }, []);

  function TableRows() {
    return order.products.map((product) => {
      return (
        <tr
          key={product.id}
          className="bg-white border-b border-dashed dark:bg-[var(--color-secondary-900)] dark:border-gray-700 border-gray-200"
        >
          <th
            scope="row"
            className="px-6 py-4 font-medium text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
          >
            <div className="flex gap-2 items-center">
              <div className="w-15 h-15 p-2 bg-gray-200 dark:bg-[#282b2e] rounded-sm">
                <img
                  src={product.image}
                  alt="product Image"
                  className="w-full h-full"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span>{product.name}</span>
                <span className="text-gray-400 font-normal">
                  Color : {product.color}
                </span>
                <span className="text-gray-400 font-normal">
                  Size : {product.size}
                </span>
              </div>
            </div>
          </th>
          <th
            scope="row"
            className="px-6 py-4 font-medium text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
          >
            ${product.price}
          </th>
          <th
            scope="row"
            className="px-6 py-4 font-medium text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
          >
            {product.quantity}
          </th>
          <th
            scope="row"
            className="px-6 py-4 font-medium  dark:text-[var(--color-text-500)]  whitespace-nowrap"
          >
            <StarIcon fontSize="small" className="text-amber-400" />
            {product.rating}
          </th>
          <th
            scope="row"
            className="px-6 py-4 font-medium text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
          >
            ${product.total}
          </th>
        </tr>
      );
    });
  }

  return (
    <PageWrapper className="flex flex-col xl:flex-row flex-wrap gap-5 p-5">
      <div className="relative flex-1  ">
        <div className="bg-white flex flex-col mb-5 dark:bg-[var(--color-secondary-900)] rounded-sm shadow-sm">
          <h3 className="text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] font-semibold p-5 border-b border-gray-200 dark:border-[#94a3d465]">
            Recent Order
          </h3>
          {!isLoading && (
            <>
              <Table
                thead={[
                  "Product Details",
                  "Item Price",
                  "Quantity",
                  "Rating",
                  "Total Amount",
                ]}
                TableRows={TableRows}
              />

              <div className="w-fit p-5 self-end ">
                <OrderSummary
                  subTotal={order.summary.subTotal}
                  discount={order.summary.discountAmount}
                  shipping={order.summary.shippingCharge}
                  tax={order.summary.estimatedTax}
                  total={order.summary.total}
                />
              </div>
            </>
          )}
        </div>
        <div className="bg-white flex flex-col  dark:bg-[var(--color-secondary-900)] rounded-sm shadow-sm">
          <div className="p-5 border-b flex justify-between border-gray-200 dark:border-[#94a3d465]">
            <h3 className="text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] font-semibold ">
              Order Status
            </h3>
            <div className="flex gap-5 flex-wrap">
              <Button color="blue" title="Change Address" style="!h-[25px]" />
              <Button color="red" title="Cancel Order" style="!h-[25px]" />
            </div>
          </div>
          {/* Time Line */}
          <div className="p-5 pl-8 pb-0">
            {!isLoading && (
              <ol className="relative border-s border-dashed border-gray-200 dark:border-[#94a3d465]">
                <li
                  className={clsx(
                    "mb-5 ms-6",
                    !!order.statusTimeline[3].status && "mb-10"
                  )}
                >
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-[#0bb39c] rounded-full -start-3 ring-8 ring-white dark:ring-gray-900">
                    <ShoppingBagIcon fontSize="" className="text-white" />
                  </span>
                  <h3 className="flex items-center mb-1  font-semibold text-gray-900 dark:text-white">
                    Order Placed{" "}
                    {!!order.statusTimeline[0].status &&
                      `- ${order.statusTimeline[0].date}`}
                  </h3>
                  {!!order.statusTimeline[0].status && (
                    <>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        {order.statusTimeline[0].date}
                      </time>
                      <p className="mb-4 font-normal text-gray-500 dark:text-gray-400">
                        {order.statusTimeline[0].details}
                      </p>
                    </>
                  )}
                </li>
                <li
                  className={clsx(
                    "mb-5 ms-6",
                    !!order.statusTimeline[3].status && "mb-10"
                  )}
                >
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-[#0bb39c] rounded-full -start-3 ring-8 ring-white dark:ring-gray-900">
                    <TakeoutDiningIcon fontSize="" className="text-white" />
                  </span>
                  <h3 className="flex items-center mb-1  font-semibold text-gray-900 dark:text-white">
                    Packed{" "}
                    {!!order.statusTimeline[1].status &&
                      `- ${order.statusTimeline[1].date}`}
                  </h3>
                  {!!order.statusTimeline[1].status && (
                    <>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        {order.statusTimeline[1].date}
                      </time>
                      <p className="mb-4 font-normal text-gray-500 dark:text-gray-400">
                        {order.statusTimeline[1].details}
                      </p>
                    </>
                  )}
                </li>
                <li
                  className={clsx(
                    "mb-5 ms-6",
                    !!order.statusTimeline[3].status && "mb-10"
                  )}
                >
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-[#0bb39c] rounded-full -start-3 ring-8 ring-white dark:ring-gray-900">
                    <CarRepairOutlinedIcon fontSize="" className="text-white" />
                  </span>
                  <h3 className="flex items-center mb-1  font-semibold text-gray-900 dark:text-white">
                    Shipped{" "}
                    {!!order.statusTimeline[2].status &&
                      `- ${order.statusTimeline[2].date}`}
                  </h3>
                  {!!order.statusTimeline[2].status && (
                    <>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        {order.statusTimeline[2].date}
                      </time>
                      <p className="mb-4 font-normal text-gray-500 dark:text-gray-400">
                        {order.statusTimeline[2].details}
                      </p>
                    </>
                  )}
                </li>
                <li
                  className={clsx(
                    "mb-5 ms-6",
                    !!order.statusTimeline[3].status && "mb-10"
                  )}
                >
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-[#0bb39c] rounded-full -start-3 ring-8 ring-white dark:ring-gray-900">
                    <TwoWheelerOutlinedIcon
                      fontSize=""
                      className="text-white"
                    />
                  </span>
                  <h3 className="flex items-center mb-1  font-semibold text-gray-900 dark:text-white">
                    Shipped{" "}
                    {!!order.statusTimeline[3].status &&
                      `- ${order.statusTimeline[3].date}`}
                  </h3>
                  {!!order.statusTimeline[3].status && (
                    <>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        {order.statusTimeline[3].date}
                      </time>
                      <p className="mb-4 font-normal text-gray-500 dark:text-gray-400">
                        {order.statusTimeline[3].details}
                      </p>
                    </>
                  )}
                </li>
                <li
                  className={clsx(
                    "mb-5 ms-6",
                    !!order.statusTimeline[3].status && "mb-10"
                  )}
                >
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-[#0bb39c] rounded-full -start-3 ring-8 ring-white dark:ring-gray-900">
                    <SportsMmaOutlinedIcon fontSize="" className="text-white" />
                  </span>
                  <h3 className="flex items-center mb-1  font-semibold text-gray-900 dark:text-white">
                    Delivered{" "}
                    {!!order.statusTimeline[4].status &&
                      `- ${order.statusTimeline[4].date}`}
                  </h3>
                  {!!order.statusTimeline[4].status && (
                    <>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        {order.statusTimeline[4].date}
                      </time>
                      <p className="mb-4 font-normal text-gray-500 dark:text-gray-400">
                        {order.statusTimeline[4].details}
                      </p>
                    </>
                  )}
                </li>
              </ol>
            )}
          </div>
        </div>
      </div>
      <div className=" max-lg:grow xl:w-1/3">
        {!isLoading && (
          <>
            {/* Logistics */}
            <div className="bg-white mb-5 dark:bg-[var(--color-secondary-900)] rounded-sm shadow-sm">
              <div className="p-4 border-b border-gray-200 dark:border-[#94a3d465] flex justify-between items-center">
                <h5 className="font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <LocalShippingOutlinedIcon fontSize="small" /> Logistics
                  Details
                </h5>
                <span className="text-xs text-blue-600 cursor-pointer">
                  Track Order
                </span>
              </div>
              <div className="p-4 text-center ">
                <h5 className="text-[16px] font-semibold mt-2">
                  {order.logistics.name}
                </h5>
                <p className="text-gray-500 text-sm dark:text-gray-300">
                  ID: {order.logistics.trackingId}
                </p>
                <p className="text-gray-500 text-sm dark:text-gray-300">
                  Payment Mode: {order.paymentMode}
                </p>
              </div>
            </div>

            {/* Customer */}
            <div className="bg-white mb-5 dark:bg-[var(--color-secondary-900)] rounded-sm shadow-sm">
              <div className="p-4 border-b border-gray-200 dark:border-[#94a3d465] flex justify-between items-center">
                <h5 className="font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <PersonOutlineOutlinedIcon fontSize="small" /> Customer
                  Details
                </h5>
                <span className="text-xs text-blue-600 cursor-pointer">
                  View Profile
                </span>
              </div>
              <div className="p-4 ">
                <div className="flex items-center gap-3 mb-3 ">
                  <img
                    src={order.customer.avatar}
                    alt="customer"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h6 className="font-semibold dark:text-gray-300">
                      {order.customer.name}
                    </h6>
                    <p className="text-gray-500 text-sm dark:text-gray-300">
                      Customer
                    </p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm dark:text-gray-300">
                  {order.customer.email}
                </p>
                <p className="text-gray-500 text-sm dark:text-gray-300">
                  {order.customer.phone}
                </p>
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-white mb-5 dark:bg-[var(--color-secondary-900)] rounded-sm shadow-sm">
              <div className="p-4 border-b border-gray-200 dark:border-[#94a3d465]">
                <h5 className="font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <LocationOnOutlinedIcon fontSize="small" /> Billing Address
                </h5>
              </div>
              <div className="p-4 text-sm text-gray-600 dark:text-gray-300">
                <ul className="space-y-1">
                  <li className="font-semibold">{order.billingAddress.name}</li>
                  <li>{order.billingAddress.phone}</li>
                  <li>{order.billingAddress.address}</li>
                  <li>{order.billingAddress.city}</li>
                  <li>{order.billingAddress.country}</li>
                </ul>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white mb-5 dark:bg-[var(--color-secondary-900)] rounded-sm shadow-sm">
              <div className="p-4 border-b border-gray-200 dark:border-[#94a3d465]">
                <h5 className="font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <LocationOnOutlinedIcon fontSize="small" /> Shipping Address
                </h5>
              </div>
              <div className="p-4 text-sm text-gray-600 dark:text-gray-300">
                <ul className="space-y-1">
                  <li className="font-semibold">
                    {order.shippingAddress.name}
                  </li>
                  <li>{order.shippingAddress.phone}</li>
                  <li>{order.shippingAddress.address}</li>
                  <li>{order.shippingAddress.city}</li>
                  <li>{order.shippingAddress.country}</li>
                </ul>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-white dark:bg-[var(--color-secondary-900)] rounded-sm shadow-sm">
              <div className="p-4 border-b border-gray-200 dark:border-[#94a3d465]">
                <h5 className="font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <CreditCardOutlinedIcon fontSize="small" /> Payment Details
                </h5>
              </div>
              <div className="p-4 text-sm text-gray-600  dark:text-gray-300 space-y-2">
                <p>
                  Transactions:{" "}
                  <span className="font-semibold">
                    {order.paymentDetails.transactionId}
                  </span>
                </p>
                <p>
                  Payment Method:{" "}
                  <span className="font-semibold">
                    {order.paymentDetails.method}
                  </span>
                </p>
                <p>
                  Card Holder:{" "}
                  <span className="font-semibold">
                    {order.paymentDetails.holder}
                  </span>
                </p>
                <p>
                  Card Number:{" "}
                  <span className="font-semibold">
                    {order.paymentDetails.cardNumber}
                  </span>
                </p>
                <p>
                  Total Amount:{" "}
                  <span className="font-semibold">${order.summary.total}</span>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  );
}
