// components
import PageWrapper from "../components/PageWrapper";
import Table from "../components/Tables";
import { Button } from "../components/ui/Buttons";
import DatePicker from "../components/ui/DatePicker";
import H3 from "../components/ui/Titles";
import ConfirmDialog from "../components/ConfirmDialog";
import SuccessAlert from "../components/SuccessAlert";
import OrderEditForm from "../components/OrderEditForm";
import Pagination from "../components/Pagination";
import NoResult from "../components/NoResult";

// Icons
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// Axios
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [toggleConfirmDialog, setToggleConfirmDialog] = useState(false);
  const [toggleEditDialog, setToggleEditDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [actionType, setActionType] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("All");

  const [filteredOrders, setFilteredOrders] = useState([]);

  const displayedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * 15;
    const endIndex = startIndex + 15;
    return filteredOrders.slice(startIndex, endIndex);
  }, [currentPage, filteredOrders]);

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

  // About Action Button

  function handelDleClick(customerData) {
    setToggleConfirmDialog(true);
    setSelectedOrder(customerData);
  }

  function handelEditClick(customerData) {
    setToggleEditDialog(true);
    setSelectedOrder(customerData);
  }

  // About Close Dialog
  function handelCloseConfirmDialog() {
    setToggleConfirmDialog(false);
  }
  function handelCloseEditDialog() {
    setToggleEditDialog(false);
  }

  // The Main Logic Of Action
  function handelEditOrder(newData) {
    const updatedOrders = orders.map((order) => {
      if (order.orderId === selectedOrder.orderId) {
        return { ...newData, orderId: selectedOrder.orderId };
      } else {
        return order;
      }
    });
    setOrders(updatedOrders);
    handelCloseEditDialog();
    setShowAlert(true);
  }

  function handelAddOrder(newData) {
    console.log(newData);
    setOrders((prev) => [newData, ...prev]);
    handelCloseEditDialog();
    setShowAlert(true);
  }

  function handelDeleteOrder() {
    const finaleOrdersList = orders.filter((order) => {
      return order.orderId !== selectedOrder.orderId;
    });
    setOrders(finaleOrdersList);
    handelCloseConfirmDialog();
    setShowAlert(true);
  }

  // Handel Filter Logic
  useEffect(() => {
    const date = dateFilter.split("-").join("/");
    const searchedOrders = orders.filter((order) => {
      const dateMatch = date === "" || date === order.joiningDate;
      const statusMatch =
        statusFilter === "All" || order.status === statusFilter;
      const paymentMatch =
        paymentFilter === "All" || order.paymentMethod === paymentFilter;
      const searchMatch =
        order.customer.name
          .toLowerCase()
          .includes(searchFilter.trim().toLowerCase()) ||
        String(order.orderId)
          .toLowerCase()
          .includes(searchFilter.trim().toLowerCase()) ||
        order.productName
          .toLowerCase()
          .includes(searchFilter.trim().toLowerCase()) ||
        order.status
          .toLowerCase()
          .includes(searchFilter.trim().toLowerCase()) ||
        order.paymentMethod
          .toLowerCase()
          .includes(searchFilter.trim().toLowerCase());
      return statusMatch && searchMatch && dateMatch && paymentMatch;
    });
    setFilteredOrders(searchedOrders);
    setCurrentPage(1);
  }, [statusFilter, orders, searchFilter, dateFilter, paymentFilter]);

  function getSearchValue(data) {
    return setSearchFilter(data);
  }

  function getStatusValue(data) {
    return setStatusFilter(data);
  }

  function getDateFilter(data) {
    return setDateFilter(data);
  }

  function getPaymentValue(data) {
    return setPaymentFilter(data);
  }

  function TableRows() {
    if (displayedOrders.length > 0) {
      return (
        <>
          {!isLoading &&
            displayedOrders.map((order) => {
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
                    {order.customer.name}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    {order.productName}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    {order.createAt}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    ${order.amount}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    {order.paymentMethod}
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
                    <div className="flex gap-2">
                      <Link
                        to="/OrderDetails"
                        className="text-[#41528a] cursor-pointer"
                      >
                        <RemoveRedEyeIcon fontSize="small" />
                      </Link>
                      <button
                        onClick={() => {
                          setActionType("edit");
                          handelEditClick(order);
                          setAlertMsg("Update Order Info Successful");
                        }}
                        className="text-[#41528a] cursor-pointer"
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </button>
                      <button
                        onClick={() => {
                          handelDleClick(order);
                          setAlertMsg("Delete Order Info Successful");
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
          <td colSpan={8}>
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
    <PageWrapper className="p-5 ">
      <div className="bg-white dark:bg-[var(--color-secondary-900)] rounded-sm shadow-sm">
        {!!TopTable && (
          <TopTable
            getStatusValue={getStatusValue}
            getPaymentValue={getPaymentValue}
            getSearchValue={getSearchValue}
            setSelectedOrder={setSelectedOrder}
            setActionType={setActionType}
            setToggleEditDialog={setToggleEditDialog}
            setAlertMsg={setAlertMsg}
            getDateFilter={getDateFilter}
          />
        )}

        {!isLoading && (
          <Table
            thead={[
              "Order ID",
              "Customer",
              "Product",
              "Order Date",
              "Amount",
              "Payment Method",
              "Delivery Status",
              "Action",
            ]}
            TableRows={TableRows}
          />
        )}

        <div className={clsx("flex items-center justify-center")}>
          <Pagination
            currentPage={currentPage}
            totalItems={filteredOrders.length}
            onPageChange={setCurrentPage}
            itemsPerPage={15}
          />
        </div>

        {/*Confirm Delete Dialog  */}
        {toggleConfirmDialog && (
          <ConfirmDialog
            desc="Are you sure you want to delete this Order?"
            closeDialog={handelCloseConfirmDialog}
            action={handelDeleteOrder}
          />
        )}
        {/*Edit Customer Dialog  */}
        {toggleEditDialog && (
          <OrderEditForm
            closeForm={handelCloseEditDialog}
            action={actionType === "edit" ? handelEditOrder : handelAddOrder}
            formBehavior={actionType}
            orderData={selectedOrder}
          />
        )}
        {/* Success Alert */}
        <SuccessAlert
          show={showAlert}
          msg={alertMsg}
          onClose={() => setShowAlert(false)}
        />
      </div>
    </PageWrapper>
  );
}

function TopTable({
  getSearchValue,
  getPaymentValue,
  getStatusValue,
  setSelectedOrder,
  setActionType,
  setToggleEditDialog,
  setAlertMsg,
  getDateFilter,
}) {
  const [date, setDate] = useState("");

  useEffect(() => {
    getDateFilter(date);
  }, [date, getDateFilter]);
  function getDate(data) {
    setDate(data);
  }
  return (
    <div className="p-3">
      <div className="flex flex-wrap justify-between items-center pb-2 mb-5 border-b border-[#94a3d465] border-dashed">
        <H3 title="Order History" style="text-xl" />
        <div className="max-sm:flex max-sm:justify-between max-sm:items-center max-sm:w-full ">
          <button
            onClick={() => {
              setSelectedOrder(null);
              setActionType("Add");
              setToggleEditDialog(true);
              setAlertMsg("Add New Customer Successful");
            }}
            type="button"
            className="py-2.5 mr-2 px-5 rounded-sm font-bold cursor-pointer text-sm text-white bg-[#0bb39c]"
          >
            <AddIcon fontSize="small" className="mr-2" />
            Create Order
          </button>
          <button
            type="button"
            className="py-2.5 px-5 rounded-sm font-bold cursor-pointer text-sm text-white bg-[#2a9ddb]"
          >
            <AddToDriveIcon fontSize="small" className="mr-2" />
            Import
          </button>
        </div>
      </div>
      <div className="flex max-lg:flex-wrap gap-3">
        <input
          onInput={(e) => {
            getSearchValue(e.target.value);
          }}
          className=" rounded-sm p-2  flex-1/2 text-sm outline-none border border-[#94a3d465] dark:text-[var(--color-text-500)]"
          type="text"
          placeholder="Search for order ID, customer, order status or something..."
        />
        <DatePicker style="flex-1/3" getDate={getDate} />

        <select
          onInput={(e) => {
            getStatusValue(e.target.value);
          }}
          id="countries"
          className="bg-gray-50 border flex-1/3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="All">Choose a Status</option>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Inprogress">Inprogress</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Pickups">Pickups</option>
          <option value="Returns">Returns</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Processing">Processing</option>
        </select>

        <select
          onInput={(e) => {
            getPaymentValue(e.target.value);
          }}
          id="countries"
          className="bg-gray-50 border flex-1/3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="All">Select Payment</option>
          <option value="All">All</option>
          <option value="Mastercard">Mastercard</option>
          <option value="Paypal">Paypal</option>
          <option value="Visa">Visa</option>
          <option value="American Express">American Express</option>
          <option value="PayPal">PayPal</option>
        </select>
      </div>
    </div>
  );
}
