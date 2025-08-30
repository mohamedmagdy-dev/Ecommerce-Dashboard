// components
import Table from "./Tables";
import Pagination from "./Pagination";
import NoResult from "./NoResult";
import { Button } from "./ui/Buttons";

// Icon
import BarChartIcon from "@mui/icons-material/BarChart";
// Axios
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import clsx from "clsx";
export default function TopSellers() {
  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;
  const displayedSellers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    return sellers.slice(startIndex, endIndex);
  }, [currentPage, sellers]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get("/Api/Sellers.json");

        setSellers(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(true);
      }
    }

    getProducts();
  }, []);

  function TableRows() {
    if (displayedSellers.length > 0) {
      return (
        <>
          {!isLoading &&
            displayedSellers.map((seller) => {
              return (
                <tr
                  key={seller.sellerId}
                  className="bg-white border-b dark:bg-[var(--color-secondary-900)] dark:border-gray-700 border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    <div className="flex gap-2 items-center">
                      <div className="w-12 h-12 p-2 bg-gray-200 dark:bg-[#282b2e] rounded-sm">
                        <img
                          src={seller.sellerAvatar}
                          alt="Seller Image"
                          className="w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span>{seller.sellerName}</span>
                        <span className="text-gray-400 font-normal">
                          Category : {seller.sellerCategory}
                        </span>
                      </div>
                    </div>
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-center text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    {seller.itemsInStock === 0 ? (
                      <Button
                        title="No Product"
                        color="red"
                        style="!h-fit !p-1 !mb-2 mx-auto"
                      />
                    ) : (
                      <>
                        {seller.itemsInStock} <br />
                      </>
                    )}
                    Stock
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-center text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    ${seller.totalEarnings}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-center text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    {seller.presenteg}%
                    <BarChartIcon
                      fontSize="small"
                      className=" ml-2 text-green-600"
                    />
                  </th>
                </tr>
              );
            })}
        </>
      );
    } else {
      return (
        <tr>
          <td colSpan={4}>
            <NoResult
              title={"Sorry! No Result Found"}
              desc={
                "We've searched more than 150+ Sellers We did not find any Product for you"
              }
            />
          </td>
        </tr>
      );
    }
  }

  return (
    <div className=" bg-white dark:bg-[var(--color-secondary-900)] rounded-sm shadow-sm  overflow-x-auto">
      {!isLoading && (
        <Table thead={["Top Sellers", "", "", ""]} TableRows={TableRows} />
      )}

      <div
        className={clsx(
          "flex items-center justify-between  flex-col-reverse pb-5"
        )}
      >
        <p className="text-sm dark:text-white">
          Showing {currentPage === 1 ? "1" : (currentPage - 1) * itemPerPage} to{" "}
          <span>{Math.min(currentPage * itemPerPage, sellers.length)} of </span>
          {sellers.length} results
        </p>

        <Pagination
          currentPage={currentPage}
          totalItems={sellers.length}
          onPageChange={setCurrentPage}
          itemsPerPage={itemPerPage}
        />
      </div>
    </div>
  );
}
