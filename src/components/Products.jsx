// components
import Table from "./Tables";
import ConfirmDialog from "./ConfirmDialog";
import SuccessAlert from "./SuccessAlert";
import Pagination from "./Pagination";
import NoResult from "./NoResult";

// Icons
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import StarIcon from "@mui/icons-material/Star";
// Axios
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
export default function ProductsComponent() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [toggleConfirmDialog, setToggleConfirmDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({});

  const [filteredProducts, setFilteredProducts] = useState([]);

  const displayedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * 15;
    const endIndex = startIndex + 15;
    return filteredProducts.slice(startIndex, endIndex);
  }, [currentPage, filteredProducts]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get("/Api/Products.json");

        setProducts(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(true);
      }
    }

    getProducts();
  }, []);

  // Handel Filter Logic
  useEffect(() => {
    const searchedProducts = products.filter((product) => {
      const searchMatch = product.productName
        .toLowerCase()
        .includes(searchFilter.trim().toLowerCase());

      return searchMatch;
    });
    setFilteredProducts(searchedProducts);
    setCurrentPage(1);
  }, [products, searchFilter]);

  // About Action Button

  function handelDleClick(customerData) {
    setToggleConfirmDialog(true);
    setSelectedProduct(customerData);
  }

  // About Close Dialog
  function handelCloseConfirmDialog() {
    setToggleConfirmDialog(false);
  }

  // The Main Logic Of Action
  function handelDeleteProduct() {
    const finaleProductsList = products.filter((product) => {
      return product.productId !== selectedProduct.productId;
    });

    setProducts(finaleProductsList);
    handelCloseConfirmDialog();
    setShowAlert(true);
  }

  function getSearchValue(data) {
    return setSearchFilter(data);
  }

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
                    className="px-6 py-4 font-medium text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    {product.stock}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    ${product.productPrice}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    {product.productOrders}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    <StarIcon fontSize="small" className="text-amber-400" />
                    {product.rate}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    {product.createdAt}
                  </th>
                  <td className="px-6 py-4   items-center text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] text-right">
                    <div className="flex gap-2">
                      <Link
                        to="/ProductDetails"
                        className="text-[#41528a] cursor-pointer"
                      >
                        <RemoveRedEyeIcon fontSize="small" />
                      </Link>

                      <Link
                        to="/CreateProduct"
                        className="text-green-600 cursor-pointer"
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </Link>
                      <button
                        onClick={() => {
                          handelDleClick(product);
                        }}
                        className="text-red-600 cursor-pointer"
                      >
                        <DeleteForeverOutlinedIcon fontSize="small" />
                      </button>
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
              desc={
                "We've searched more than 150+ customer We did not find any customer for you search."
              }
            />
          </td>
        </tr>
      );
    }
  }

  return (
    <>
      <TopTable getSearchValue={getSearchValue} />

      {!isLoading && (
        <Table
          thead={[
            "Product",
            "Stock",
            "Price",
            "Orders",
            "Rating",
            "Published",
            "Action",
          ]}
          TableRows={TableRows}
        />
      )}

      <div
        className={clsx(
          "flex items-center justify-center gap-2 flex-wrap p-3  pt-8"
        )}
      >
        <p className="text-sm dark:text-white">
          Showing {currentPage === 1 ? "1" : (currentPage - 1) * 15} to{" "}
          <span>{Math.min(currentPage * 15, products.length)} of </span>
          {products.length} results
        </p>
        <Pagination
          currentPage={currentPage}
          totalItems={filteredProducts.length}
          onPageChange={setCurrentPage}
          itemsPerPage={15}
        />
      </div>

      {/*Confirm Delete Dialog  */}
      {toggleConfirmDialog && (
        <ConfirmDialog
          desc="Are you sure you want to delete this Product?"
          closeDialog={handelCloseConfirmDialog}
          action={handelDeleteProduct}
        />
      )}
      {/* Success Alert */}
      <SuccessAlert
        show={showAlert}
        msg="Product Deleted Successful"
        onClose={() => setShowAlert(false)}
      />
    </>
  );
}

function TopTable({ getSearchValue }) {
  return (
    <div className="px-3 pt-5 ">
      <div className="flex flex-wrap justify-between items-center pb-2 mb-5 gap-5">
        <Link
          to="/CreateProducts"
          type="button"
          className="py-2.5 mr-2 px-5 rounded-sm font-bold cursor-pointer text-sm text-white bg-[#0bb39c]"
        >
          <AddIcon fontSize="small" className="mr-2" />
          Add Product
        </Link>
        <input
          onInput={(e) => {
            getSearchValue(e.target.value);
          }}
          className=" rounded-sm p-2  text-sm outline-none border border-[#94a3d465] max-w-[200px] grow dark:text-[var(--color-text-500)]"
          type="text"
          placeholder="Search by Product Name"
        />
      </div>
    </div>
  );
}
