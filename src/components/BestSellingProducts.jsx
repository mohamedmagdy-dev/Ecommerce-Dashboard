// components
import Table from "./Tables";
import Pagination from "./Pagination";
import NoResult from "./NoResult";
import { Button } from "./ui/Buttons";

// Icon
import StarIcon from "@mui/icons-material/Star";

// Axios
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import clsx from "clsx";
export default function BestSellingProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;
  const displayedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    return products.slice(startIndex, endIndex);
  }, [currentPage, products]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get("/Api/BestSellingProducts.json");

        setProducts(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(true);
      }
    }

    getProducts();
  }, []);

  function TableRows() {
    if (displayedProducts.length > 0) {
      return (
        <>
          {!isLoading &&
            displayedProducts.map((product) => {
              return (
                <tr
                  key={product.productId}
                  className="bg-white border-b dark:bg-[var(--color-secondary-900)] dark:border-gray-700 border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    <div className="flex gap-2 items-center">
                      <div className="w-12 h-12 p-2 bg-gray-200 dark:bg-[#282b2e] rounded-sm">
                        <img
                          src={product.image}
                          alt="product Image"
                          className="w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span>{product.productName}</span>
                        <span className="text-gray-400 font-normal">
                          Category : {product.category}
                        </span>
                      </div>
                    </div>
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-center text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    {product.stock === 0 ? (
                      <Button
                        title="Out of stock"
                        color="red"
                        style="!h-fit !p-1 !mb-2 mx-auto"
                      />
                    ) : (
                      <>
                        {product.stock} <br />
                      </>
                    )}
                    Stock
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-center text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    (${product.productPrice}) <br /> Price
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-center text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    ({product.productOrders}) <br /> Orders
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-center dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    (<StarIcon fontSize="small" className="text-amber-400" />
                    {product.rate}) <br /> Rate
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    {product.createdAt}
                  </th>
                </tr>
              );
            })}
        </>
      );
    } else {
      return (
        <tr>
          <td colSpan={6}>
            <NoResult
              title={"Sorry! No Result Found"}
              desc={
                "We've searched more than 150+ Products We did not find any Product for you"
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
        <Table
          thead={["Best Selling Products", "", "", "", "", ""]}
          TableRows={TableRows}
        />
      )}

      <div className={clsx("flex items-center  flex-col-reverse pb-5 ")}>
        <p className="text-sm dark:text-white">
          Showing {currentPage === 1 ? "1" : (currentPage - 1) * itemPerPage} to{" "}
          <span>
            {Math.min(currentPage * itemPerPage, products.length)} of{" "}
          </span>
          {products.length} results
        </p>

        <Pagination
          currentPage={currentPage}
          totalItems={products.length}
          onPageChange={setCurrentPage}
          itemsPerPage={itemPerPage}
        />
      </div>
    </div>
  );
}
