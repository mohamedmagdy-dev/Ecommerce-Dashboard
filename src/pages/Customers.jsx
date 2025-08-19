// components
import PageWrapper from "../components/PageWrapper";
import Table from "../components/Tables";
import { Button } from "../components/ui/Buttons";
import DatePicker from "../components/ui/DatePicker";
import H3 from "../components/ui/Titles";
import ConfirmDialog from "../components/ConfirmDialog";
import SuccessAlert from "../components/SuccessAlert";
import CustomerEditForm from "../components/CustomerEditForm";
import Pagination from "../components/Pagination";

// Icons
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
// Axios
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import clsx from "clsx";
import NoResult from "../components/NoResult";
export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [toggleConfirmDialog, setToggleConfirmDialog] = useState(false);
  const [toggleEditDialog, setToggleEditDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [actionType, setActionType] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const displayedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * 15;
    const endIndex = startIndex + 15;
    return filteredCustomers.slice(startIndex, endIndex);
  }, [currentPage, filteredCustomers]);

  useEffect(() => {
    async function getCustomers() {
      try {
        const response = await axios.get("/Api/customers.json");

        setCustomers(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(true);
      }
    }

    getCustomers();
  }, []);

  // About Action Button

  function handelDleClick(customerData) {
    setToggleConfirmDialog(true);
    setSelectedCustomer(customerData);
  }

  function handelEditClick(customerData) {
    setToggleEditDialog(true);
    setSelectedCustomer(customerData);
  }

  // About Close Dialog
  function handelCloseConfirmDialog() {
    setToggleConfirmDialog(false);
  }
  function handelCloseEditDialog() {
    setToggleEditDialog(false);
  }

  // The Main Logic Of Action
  function handelEditCustomer(newData) {
    const updatedCustomers = customers.map((customer) => {
      if (customer.customerId === selectedCustomer.customerId) {
        return { ...newData, customerId: selectedCustomer.customerId };
      } else {
        return customer;
      }
    });
    setCustomers(updatedCustomers);
    handelCloseEditDialog();
    setShowAlert(true);
  }

  function handelAddCustomer(newData) {
    setCustomers((prev) => [
      { ...newData, customerId: new Date().setSeconds() },
      ...prev,
    ]);
    handelCloseEditDialog();
    setShowAlert(true);
  }

  function handelDeleteCustomer() {
    const finaleCustomersList = customers.filter((customer) => {
      return customer.customerId !== selectedCustomer.customerId;
    });
    setCustomers(finaleCustomersList);
    handelCloseConfirmDialog();
    setShowAlert(true);
  }

  // Handel Filter Logic
  useEffect(() => {
    const date = dateFilter.split("-").join("/");

    const searchedCustomers = customers.filter((customer) => {
      const dateMatch = date === "" || date === customer.joiningDate;
      const statusMatch =
        statusFilter === "All" || customer.status === statusFilter;
      const searchMatch =
        customer.customerName
          .toLowerCase()
          .includes(searchFilter.trim().toLowerCase()) ||
        customer.email
          .toLowerCase()
          .includes(searchFilter.trim().toLowerCase()) ||
        customer.phone.includes(searchFilter.trim());
      return statusMatch && searchMatch && dateMatch;
    });
    setFilteredCustomers(searchedCustomers);
    setCurrentPage(1);
  }, [statusFilter, customers, searchFilter, dateFilter]);

  function getSearchValue(data) {
    return setSearchFilter(data);
  }

  function getStatusValue(data) {
    return setStatusFilter(data);
  }

  function getDateFilter(data) {
    return setDateFilter(data);
  }

  function TableRows() {
    if (displayedProducts.length > 0) {
      return (
        <>
          {!isLoading &&
            displayedProducts.map((customer) => {
              return (
                <tr
                  key={customer.customerId}
                  className="bg-white border-b dark:bg-[var(--color-secondary-900)] dark:border-gray-700 border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    {customer.customerName}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    {customer.email}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    {customer.phone}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    {customer.joiningDate}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]  whitespace-nowrap"
                  >
                    <Button
                      title={customer.status}
                      color={customer.status === "Active" ? "green" : "red"}
                      style="!h-[25px]"
                    />
                  </th>
                  <td className="px-6 py-4   items-center text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] text-right">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setActionType("edit");
                          handelEditClick(customer);
                          setAlertMsg("Update Customer Info Successful");
                        }}
                        className="text-[#41528a] cursor-pointer"
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </button>
                      <button
                        onClick={() => {
                          handelDleClick(customer);
                          setAlertMsg("Delete Customer Info Successful");
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
          <td colSpan={6}>
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
            getSearchValue={getSearchValue}
            setSelectedCustomer={setSelectedCustomer}
            setActionType={setActionType}
            setToggleEditDialog={setToggleEditDialog}
            setAlertMsg={setAlertMsg}
            getDateFilter={getDateFilter}
          />
        )}

        {!isLoading && (
          <Table
            thead={[
              "Customer",
              "Email",
              "Phone",
              "Joining Date",
              "Status",
              "Action",
            ]}
            TableRows={TableRows}
          />
        )}

        <div className={clsx("flex items-center justify-center")}>
          <Pagination
            currentPage={currentPage}
            totalItems={filteredCustomers.length}
            onPageChange={setCurrentPage}
            itemsPerPage={15}
          />
        </div>

        {/*Confirm Delete Dialog  */}
        {toggleConfirmDialog && (
          <ConfirmDialog
            desc="Are you sure you want to delete this Customer?"
            closeDialog={handelCloseConfirmDialog}
            action={handelDeleteCustomer}
          />
        )}
        {/*Edit Customer Dialog  */}
        {toggleEditDialog && (
          <CustomerEditForm
            closeForm={handelCloseEditDialog}
            action={
              actionType === "edit" ? handelEditCustomer : handelAddCustomer
            }
            formBehavior={actionType}
            customerData={selectedCustomer}
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
  getStatusValue,
  setSelectedCustomer,
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
        <H3 title="Customer List" style="text-xl" />
        <div className="max-sm:flex max-sm:justify-between max-sm:items-center max-sm:w-full ">
          <button
            onClick={() => {
              setSelectedCustomer(null);
              setActionType("add");
              setToggleEditDialog(true);
              setAlertMsg("Add New Customer Successful");
            }}
            type="button"
            className="py-2.5 mr-2 px-5 rounded-sm font-bold cursor-pointer text-sm text-white bg-[#0bb39c]"
          >
            <AddIcon fontSize="small" className="mr-2" />
            Add Customer
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
          placeholder="Search for customer, email, phone or something..."
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
          <option value="Active">Active</option>
          <option value="Inactive">InActive</option>
        </select>
      </div>
    </div>
  );
}
