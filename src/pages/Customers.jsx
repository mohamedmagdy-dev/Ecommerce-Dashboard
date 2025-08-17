import PageWrapper from "../components/PageWrapper";
import Table from "../components/Tables";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Button } from "../components/ui/Buttons";
import H3 from "../components/ui/Titles";
import DatePicker from "../components/ui/DatePicker";
// Axios
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const displayedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * 15;
    const endIndex = startIndex + 15;
    return customers.slice(startIndex, endIndex);
  }, [currentPage, customers]);

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

  function TopTable() {
    return (
      <div className="p-3">
        <div className="flex flex-wrap justify-between items-center pb-2 mb-5 border-b border-[#94a3d465] border-dashed">
          <H3 title="Customer List" style="text-xl" />
          <div className="max-sm:flex max-sm:justify-between max-sm:items-center max-sm:w-full ">
            <button
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
        <div className="flex flex-wrap gap-3">
          <input
            className="grow rounded-sm p-2  flex-1/2 text-sm outline-none border border-[#94a3d465] dark:text-[var(--color-text-500)]"
            type="text"
            placeholder="Search for customer, email, phone, status or something..."
          />
          <DatePicker style="flex-1/3" />

          <select
            id="countries"
            className="bg-gray-50 border flex-1/3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Choose a Status</option>
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">InActive</option>
          </select>
        </div>
      </div>
    );
  }

  function handelEditCustomer(customerData) {
    console.log(customerData);
  }
  function handelDeleteCustomer(customerData) {
    console.log(customerData);
  }

  function TableRows() {
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
                      onClick={() => handelEditCustomer(customer)}
                      className="text-[#41528a] cursor-pointer"
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </button>
                    <button
                      onClick={() => handelDeleteCustomer(customer)}
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
  }
  return (
    <PageWrapper className="p-5">
      <Table
        thead={[
          "Customer",
          "Email",
          "Phone",
          "Joining Date",
          "Status",
          "Action",
        ]}
        pagination={{
          showMe: true,
          currentPage,
          totalItems: customers.length,
          itemsPerPage: 15,
          setCurrentPage,
        }}
        TopTable={TopTable}
      >
        {!isLoading && <TableRows />}
      </Table>
    </PageWrapper>
  );
}
