import PageWrapper from "../components/PageWrapper";
import TextEditor from "../components/TextEditor";
import { useForm } from "react-hook-form";

export default function CreateProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted ✅", data);
  };

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="p-5 min-h-300">
        <div>
          <div className="bg-white dark:bg-[var(--color-secondary-900)]  rounded-sm p-3 mb-5">
            {/* Product Title */}
            <div className="flex flex-col space-y-2 mb-5">
              <label
                htmlFor="ProductTitle"
                className="font-medium text-sm text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]"
              >
                Product Title
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                type="text"
                id="ProductTitle"
                placeholder="Enter product title"
                className="border text-sm border-gray-200  p-2 rounded text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]"
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </div>
            {/* Product Description */}
            <div className="flex flex-col space-y-2">
              <label className="font-medium text-sm text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]">
                Product Description
              </label>

              <TextEditor />
            </div>
          </div>
          {/* <div className="bg-white dark:bg-[var(--color-secondary-900)]  rounded-sm p-3 mb-5"></div> */}
          <div className="bg-white dark:bg-[var(--color-secondary-900)]  rounded-sm p-3 mb-5">
            <h3 className=" text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]">
              Product Gallery
            </h3>
          </div>
        </div>
        <div></div>
      </form>
    </PageWrapper>
  );
}
