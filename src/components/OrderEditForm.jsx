import { useForm } from "react-hook-form";
export default function CustomerEditForm({
  closeForm,
  action,
  orderData,
  formBehavior,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: orderData || {},
  });

  return (
    <>
      <div className="flex fixed overflow-y-auto overflow-x-hidden p-5 top-0 bg-[#1b1b1b4b] dark:bg-[#302f2f59] right-0 left-0 z-3 justify-center items-center w-full h-full">
        <div className="relative p-4 w-full max-w-md max-h-full ">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                <span className="capitalize">{formBehavior} </span>
                Order
              </h3>
              <button
                onClick={() => closeForm()}
                type="button"
                className=" cursor-pointer duration-200 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form onSubmit={handleSubmit(action)} className="p-4 md:p-5">
              <div className="flex flex-col gap-4 mb-4">
                <div>
                  <label
                    htmlFor="orderId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Id
                  </label>
                  {/* handel orderId Error */}
                  {errors.orderId && (
                    <p className="text-red-500 text-sm">
                      {errors.orderId.message}
                    </p>
                  )}
                  <input
                    {...register("orderId")}
                    defaultValue={
                      orderData?.orderData || `#V${new Date().getMilliseconds()}`
                    }
                    type="text"
                    id="orderId"
                    disabled={true}
                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Order Id"
                  />
                </div>
                <div>
                  <label
                    htmlFor="Name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Customer Name
                  </label>
                  {/* handel Email Error */}
                  {errors.customer?.name && (
                    <p className="text-red-500 text-sm">
                      {errors.customer.name.message}
                    </p>
                  )}
                  <input
                    {...register("customer.name", {
                      required: "Name is required",
                    })}
                    type="text"
                    id="Name"
                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Customer name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="product"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Name
                  </label>
                  {/* handel phone Error */}
                  {errors.productName && (
                    <p className="text-red-500 text-sm">
                      {errors.productName.message}
                    </p>
                  )}
                  <input
                    {...register("productName", {
                      required: "Product Name is required",
                    })}
                    type="text"
                    id="product"
                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Product Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="createAt"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Order Date
                  </label>
                  {/* handel phone Error */}
                  {errors.createAt && (
                    <p className="text-red-500 text-sm">
                      {errors.createAt.message}
                    </p>
                  )}
                  <input
                    {...register("createAt", {
                      required: "Date is required",
                    })}
                    type="date"
                    id="createAt"
                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div className="flex justify-between gap-2">
                  <div>
                    <label
                      htmlFor="createAt"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Order Amount
                    </label>
                    {/* handel phone Error */}
                    {errors.amount && (
                      <p className="text-red-500 text-sm">
                        {errors.amount.message}
                      </p>
                    )}
                    <input
                      {...register("amount", {
                        required: "Amount is required",
                      })}
                      type="number"
                      id="amount"
                      className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type Order Amount"
                    />
                  </div>
                  <div className="grow">
                    <label
                      htmlFor="paymentMethod"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      payment method
                    </label>
                    {/* handel ["payment method"] Error */}
                    {errors.paymentMethod && (
                      <p className="text-red-500 text-sm">
                        {errors.paymentMethod.message}
                      </p>
                    )}
                    <select
                      {...register("paymentMethod", {
                        required: "Payment Method is required",
                      })}
                      id="paymentMethod"
                      className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="">Select Payment</option>

                      <option value="Mastercard">Mastercard</option>
                      <option value="Paypal">Paypal</option>
                      <option value="Visa">Visa</option>
                      <option value="American Express">American Express</option>
                      <option value="PayPal">PayPal</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    status
                  </label>
                  {/* handel status Error */}
                  {errors.status && (
                    <p className="text-red-500 text-sm">
                      {errors.status.message}
                    </p>
                  )}
                  <select
                    {...register("status", {
                      required: "status is required",
                    })}
                    id="status"
                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="">Choose a Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Inprogress">Inprogress</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Pickups">Pickups</option>
                    <option value="Returns">Returns</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Processing">Processing</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => closeForm()}
                  type="button"
                  className=" inline-flex items-center duration-200 bg-[#f5f7fa] hover:bg-[#d4d4d6e0] cursor-pointer  font-medium rounded-sm text-sm px-5 py-2.5 text-center "
                >
                  close
                </button>
                <button
                  type="submit"
                  className="text-white inline-flex items-center duration-200 bg-[#0bb39c] hover:bg-[#098b7a] cursor-pointer  font-medium rounded-sm text-sm px-5 py-2.5 text-center "
                >
                  {formBehavior === "Add" ? "Add" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
