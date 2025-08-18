import { useForm } from "react-hook-form";
export default function CustomerEditForm({
  closeForm,
  action,
  customerData,
  formBehavior,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: customerData || {},
  });

  return (
    <>
      <div className="flex fixed top-0 bg-[#1b1b1b4b] dark:bg-[#302f2f59] right-0 left-0 z-3 justify-center items-center w-full h-full">
        <div className="relative p-4 w-full max-w-md max-h-full ">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                <span className="capitalize">{formBehavior} </span>
                Customer
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
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Customer Name
                  </label>
                  {/* handel Name Error */}
                  {errors.customerName && (
                    <p className="text-red-500 text-sm">
                      {errors.customerName.message}
                    </p>
                  )}
                  <input
                    {...register("customerName", {
                      required: "Name is required",
                    })}
                    type="text"
                    id="name"
                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Customer name"
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Customer Email
                  </label>
                  {/* handel Email Error */}
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                  <input
                    {...register("email", {
                      required: "email is required",
                    })}

                    type="email"
                    id="email"
                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Customer Email"
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Customer Phone
                  </label>
                  {/* handel phone Error */}
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                  <input
                    {...register("phone", {
                      required: "phone is required",
                    })}
 
                    type="text"
                    name="phone"
                    id="phone"
                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Customer Phone"
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Joining Date
                  </label>
                  {/* handel date Error */}
                  {errors.joiningDate && (
                    <p className="text-red-500 text-sm">
                      {errors.joiningDate.message}
                    </p>
                  )}
                  <input
                    {...register("joiningDate", {
                      required: "date is required",
                    })}

                    type="text"
                    id="date"
                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Joining Date"
                  />
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="Status"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Status
                  </label>
                  {/* handel Status Error */}
                  {errors.status && (
                    <p className="text-red-500 text-sm">
                      {errors.status.message}
                    </p>
                  )}
                  <select
                    {...register("status", {
                      required: "Status is required",
                    })}

                    id="Status"
                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
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
                  {formBehavior === "add" ? "Add" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
