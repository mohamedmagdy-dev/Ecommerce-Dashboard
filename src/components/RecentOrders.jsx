// components
import Table from "../components/Tables";
import { Button } from "../components/ui/Buttons";
import NoResult from "./NoResult";
// Axios
import axios from "axios";
import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
export default function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getOrders() {
      try {
        const response = await axios.get("/Api/Orders.json");
        setOrders(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(true);
      }
    }

    getOrders();
  }, []);

  function TableRows() {
    orders.length = 5;
    if (orders.length > 0) {
      return (
        <>
          {!isLoading &&
            orders.map((order) => {
              return (
                <tr
                  key={order.orderId}
                  className="bg-white border-b dark:bg-[var(--color-secondary-900)] dark:border-gray-700 border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    {order.orderId}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    <div className="flex gap-2 items-center">
                      <img
                        src={order.customer.avatar}
                        alt="Customer img"
                        className="w-10 h-10 rounded-full"
                      />
                      {order.customer.name}
                    </div>
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    {order.productName}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-green-600 dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    ${order.amount}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    {order.vendor}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    <Button
                      title={order.status}
                      color={
                        order.status === "Shipped"
                          ? "green"
                          : order.status === "Processing"
                          ? "orange"
                          : "red"
                      }
                      style="!h-[25px]"
                    />
                  </th>
                  <td className="px-6 py-4   items-center text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] text-right">
                    <div className="flex items-center">
                      ({order.rating}){" "}
                      <StarIcon fontSize="" className="text-yellow-400" />
                    </div>
                  </td>
                </tr>
              );
            })}
        </>
      );
    } else {
      return (
        <tr>
          <td colSpan={7}>
            <NoResult
              title={"Sorry! No Result Found"}
              desc={"  We did not find any Orders for you search."}
            />
          </td>
        </tr>
      );
    }
  }

  return (
    <div className="bg-white dark:bg-[var(--color-secondary-900)] rounded-sm shadow-sm">
      <h3 className="text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] font-semibold p-3 border-b border-gray-200 dark:border-[#94a3d465]">
        Recent Orders
      </h3>
      {!isLoading && (
        <Table
          thead={[
            "Order ID",
            "Customer",
            "Product",
            "Amount",
            "Vendor",
            "Status",
            "Rating",
          ]}
          TableRows={TableRows}
        />
      )}
    </div>
  );
}
