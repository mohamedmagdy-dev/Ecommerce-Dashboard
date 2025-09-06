import PageWrapper from "../components/PageWrapper";
import TextEditor from "../components/TextEditor";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import clsx from "clsx";
// Icons
import PermMediaIcon from "@mui/icons-material/PermMedia";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
export default function CreateProduct() {
  const [previewImg, setPreviewImg] = useState();
  const [previewGalleryImgs, setPreviewGalleryImgs] = useState([]);
  const mainProductImgUpload = useRef(null);
  const productGalleryImgsUpload = useRef(null);
  const [showTap, setShowTap] = useState("GeneralInfo");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const textInputStyle =
    "border dark:bg-[#25292e] text-sm border-gray-200 p-2 rounded text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]";

  const onSubmit = (data) => {
    console.log("Form Submitted ✅", data);
  };

  function handleUploadFile() {
    mainProductImgUpload.current.click();
  }

  function handleUploadGallery() {
    productGalleryImgsUpload.current.click();
  }

  function handlePreviewImg(e) {
    const file = e.target.files[0];
    if (file) {
      setPreviewImg(URL.createObjectURL(file));
    }
  }

  function handlePreviewGalleryImgs(e) {
    const file = e.target.files[0];
    setPreviewGalleryImgs((prev) => [
      ...prev,
      {
        imgUrl: URL.createObjectURL(file),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2),
      },
    ]);
  }

  function handelDelImgFromGallery(url) {
    const filterImgs = previewGalleryImgs.filter((img) => {
      return img.imgUrl !== url;
    });
    setPreviewGalleryImgs(filterImgs);
  }


  return (
    <PageWrapper>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-5  flex max-[1350px]:flex-col gap-5 "
      >
        <div className="flex-1 shrink relative pb-8">
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
                className={textInputStyle}
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
          <div className="bg-white dark:bg-[var(--color-secondary-900)]  rounded-sm mb-5">
            <h3 className=" text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] font-bold border-b border-gray-200 p-3">
              Product Gallery
            </h3>
            <div className="p-3">
              <div>
                <h4 className="text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] font-semibold">
                  Product Image
                </h4>
                <span className="text-gray-400 text-sm">
                  Add Product main Image.
                </span>
              </div>

              {/* Upload main Image */}
              <div className="my-5 mx-auto w-fit relative">
                <input
                  type="file"
                  name="productImg"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePreviewImg}
                  ref={mainProductImgUpload}
                />
                <div className="p-3 w-40 h-40 bg-gray-200 rounded-sm">
                  {previewImg && (
                    <img
                      src={previewImg}
                      alt="previewImg"
                      className="w-full h-full object-cover "
                    />
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleUploadFile}
                  className="w-8 h-8 bg-gray-100 rounded-full absolute right-[-15px] bottom-[-15px] cursor-pointer border"
                >
                  <PermMediaIcon fontSize="" />
                </button>
              </div>
            </div>
            {/* Upload Multi Image */}
            <div className="p-3">
              <div>
                <h4 className="text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] font-semibold">
                  Product Gallery
                </h4>
                <span className="text-gray-400 text-sm">
                  Add Product Gallery Images.
                </span>
              </div>
              <div className="mt-5 flex justify-center items-center flex-col h-80 border border-dashed  border-gray-200">
                <input
                  type="file"
                  name="productImgs"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handlePreviewGalleryImgs}
                  ref={productGalleryImgsUpload}
                />
                <button
                  type="button"
                  onClick={handleUploadGallery}
                  className="text-gray-400 cursor-pointer"
                >
                  <CloudUploadIcon sx={{ fontSize: 100 }} />
                </button>
                <p className="text-xl">click to upload</p>
              </div>
              {/* Show Uploaded Gallery Imgs */}
              {previewGalleryImgs && (
                <div className="mt-5">
                  {previewGalleryImgs.map((img, index) => {
                    return (
                      <div
                        key={index}
                        className="flex gap-8 justify-between max-sm:flex-wrap p-2 border  max-sm:justify-center items-start rounded-sm border-gray-200"
                      >
                        <img
                          src={img.imgUrl}
                          alt="Gallery Img"
                          className="rounded-sm w-15 h-15 object-cover "
                        />
                        <div>
                          <h5 className="text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]">
                            {img.name}
                          </h5>
                          <span className="text-gray-400 text-sm">
                            {img.size} MB
                          </span>
                        </div>
                        <button
                          onClick={() => handelDelImgFromGallery(img.imgUrl)}
                          type="button"
                          className="text-white rounded-sm p-2 text-sm bg-[#f06448] cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="bg-white dark:bg-[var(--color-secondary-900)]  rounded-sm  ">
            <div className="mb-8">
              <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul
                  className="flex flex-wrap -mb-px text-sm font-medium text-center"
                  id="default-tab"
                  data-tabs-toggle="#default-tab-content"
                  role="tablist"
                >
                  <li className="me-2" role="presentation">
                    <button
                      className={clsx(
                        "inline-block p-4 rounded-t-lg border-b-2 border-transparent cursor-pointer duration-200 text-[#405189] ",
                        showTap === "GeneralInfo"
                          ? "!border-[#405189] dark:text-white  "
                          : "hidden"
                      )}
                      id="GeneralInfo-tab"
                      data-tabs-target="#GeneralInfo"
                      type="button"
                      role="tab"
                      aria-controls="GeneralInfo"
                      aria-selected="false"
                      onClick={() => setShowTap("GeneralInfo")}
                    >
                      General Info
                    </button>
                  </li>
                  <li className="me-2" role="presentation">
                    <button
                      className={clsx(
                        "inline-block p-4 rounded-t-lg border-b-2 border-transparent cursor-pointer duration-200  text-[#405189] ",
                        showTap === "MetaData"
                          ? " !border-[#405189] dark:text-white"
                          : "hidden"
                      )}
                      id="MetaData-tab"
                      data-tabs-target="#MetaData"
                      type="button"
                      role="tab"
                      aria-controls="MetaData"
                      aria-selected="false"
                      onClick={() => setShowTap("MetaData")}
                    >
                      Meta Data
                    </button>
                  </li>
                </ul>
              </div>
              <div id="default-tab-content">
                {/* General Form  */}
                <div
                  className={clsx(
                    " p-4 ",
                    showTap === "GeneralInfo" ? "block " : "hidden"
                  )}
                  id="GeneralInfo"
                  role="tabpanel"
                  aria-labelledby="GeneralInfo-tab"
                >
                  <div className="flex max-md:flex-col gap-5 mb-5">
                    <div className="flex flex-col space-y-2  grow">
                      <label
                        htmlFor="ManufacturerName"
                        className="font-medium text-sm text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]"
                      >
                        Manufacturer Name
                      </label>
                      <input
                        {...register("ManufacturerName", {
                          required: "Manufacturer Name is required",
                        })}
                        type="text"
                        id="ManufacturerName"
                        placeholder="Enter Manufacturer Name"
                        className={textInputStyle}
                      />
                      {errors.ManufacturerName && (
                        <span className="text-red-500 text-sm">
                          {errors.ManufacturerName.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2  grow">
                      <label
                        htmlFor="ManufacturerBrand"
                        className="font-medium text-sm text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]"
                      >
                        Manufacturer Brand
                      </label>
                      <input
                        {...register("ManufacturerBrand", {
                          required: "Manufacturer Brand is required",
                        })}
                        type="text"
                        id="ManufacturerBrand"
                        placeholder="Enter Manufacturer Brand"
                        className={textInputStyle}
                      />
                      {errors.ManufacturerBrand && (
                        <span className="text-red-500 text-sm">
                          {errors.ManufacturerBrand.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-5 max-lg:flex-col">
                    <div className="flex max-md:flex-col gap-5 grow">
                      <div className="flex flex-col space-y-2 grow">
                        <label
                          htmlFor="Stocks"
                          className="font-medium text-sm text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]"
                        >
                          Stocks
                        </label>
                        <input
                          {...register("Stocks", {
                            required: "Stocks is required",
                          })}
                          type="number"
                          id="Stocks"
                          placeholder="Enter Stocks"
                          className={textInputStyle}
                        />
                        {errors.Stocks && (
                          <span className="text-red-500 text-sm">
                            {errors.Stocks.message}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col space-y-2  grow">
                        <label
                          htmlFor="Price"
                          className="font-medium text-sm text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]"
                        >
                          Price
                        </label>
                        <input
                          {...register("Price", {
                            required: "Price is required",
                          })}
                          type="number"
                          id="Price"
                          placeholder="Enter Price"
                          className={textInputStyle}
                        />
                        {errors.Price && (
                          <span className="text-red-500 text-sm">
                            {errors.Price.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex max-md:flex-col gap-5 grow">
                      <div className="flex flex-col space-y-2 grow">
                        <label
                          htmlFor="Discount"
                          className="font-medium text-sm text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]"
                        >
                          Discount
                        </label>
                        <input
                          {...register("Discount", {
                            required: "Discount is required",
                          })}
                          type="number"
                          id="Discount"
                          placeholder="Enter Discount"
                          className={textInputStyle}
                        />
                        {errors.Discount && (
                          <span className="text-red-500 text-sm">
                            {errors.Discount.message}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col space-y-2  grow">
                        <label
                          htmlFor="Orders"
                          className="font-medium text-sm text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]"
                        >
                          Orders
                        </label>
                        <input
                          {...register("Orders", {
                            required: "Manufacturer Name is required",
                          })}
                          type="number"
                          id="Orders"
                          placeholder="Enter Orders"
                          className={textInputStyle}
                        />
                        {errors.Orders && (
                          <span className="text-red-500 text-sm">
                            {errors.Orders.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Meta Data */}
                <div
                  className={clsx(
                    "hidden p-4 ",
                    showTap === "MetaData" && "!block"
                  )}
                  id="MetaData"
                  role="tabpanel"
                  aria-labelledby="MetaData-tab"
                >
                  <div className="flex max-md:flex-col gap-5 mb-5">
                    <div className="flex flex-col space-y-2  grow">
                      <label
                        htmlFor="MetaTitle"
                        className="font-medium text-sm text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]"
                      >
                        Meta title
                      </label>
                      <input
                        {...register("MetaTitle", {
                          required: "Meta title is required",
                        })}
                        type="text"
                        id="MetaTitle"
                        placeholder="Enter Meta title"
                        className={textInputStyle}
                      />
                      {errors.MetaTitle && (
                        <span className="text-red-500 text-sm">
                          {errors.MetaTitle.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2  grow">
                      <label
                        htmlFor="MetaKeywords"
                        className="font-medium text-sm text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]"
                      >
                        Meta Keywords
                      </label>
                      <input
                        {...register("MetaKeywords", {
                          required: "Meta Keywords is required",
                        })}
                        type="text"
                        id="MetaKeywords"
                        placeholder="Enter Meta Keywords"
                        className={textInputStyle}
                      />
                      {errors.MetaKeywords && (
                        <span className="text-red-500 text-sm">
                          {errors.MetaKeywords.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2  grow">
                    <label
                      htmlFor="MetaDescription"
                      className="font-medium text-sm text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]"
                    >
                      Meta Description
                    </label>
                    <textarea
                      {...register("MetaDescription", {
                        required: "Meta Description is required",
                      })}
                      type="text"
                      id="MetaDescription"
                      placeholder="Enter Meta Description"
                      className={textInputStyle}
                    ></textarea>

                    {errors.MetaDescription && (
                      <span className="text-red-500 text-sm">
                        {errors.MetaDescription.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="bg-[#0ab39c] px-4 cursor-pointer absolute right-0 bottom-0 py-2 rounded-sm text-white">
            submit
          </button>
        </div>

        <div className="w-150 max-lg:w-full ">
          {/* Publish */}
          <div className="bg-white dark:bg-[var(--color-secondary-900)]  rounded-sm mb-5">
            <h3 className=" text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] font-bold border-b border-gray-200 p-3">
              Publish
            </h3>
            <div className="p-3 space-y-4">
              {/* Status */}
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="Status"
                  className="form-label font-medium text-sm text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]"
                >
                  Status
                </label>
                <select
                  id="Status"
                  {...register("Status")}
                  className="form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm
                rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500
                dark:focus:border-blue-500 w-full"
                >
                  <option value="Published">Published</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              {/* Visibility */}
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="Visibility"
                  className="form-label font-medium text-sm text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]"
                >
                  Visibility
                </label>
                <select
                  id="Visibility"
                  {...register("Visibility")}
                  className="form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm
                rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500
                dark:focus:border-blue-500 w-full"
                >
                  <option value="Public">Public</option>
                  <option value="Hidden">Hidden</option>
                </select>
              </div>
            </div>
          </div>

          {/* Publish Schedule */}
          <div className="bg-white dark:bg-[var(--color-secondary-900)]  rounded-sm mb-5">
            <h3 className=" text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] font-bold border-b border-gray-200 p-3">
              Publish Schedule
            </h3>
            <div className="p-3">
              <label
                htmlFor="PublishDate"
                className=" form-label font-medium text-sm text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]"
              >
                Publish Date &amp; Time
              </label>
              <br />
              <input
                type="datetime-local"
                id="PublishDate"
                {...register("PublishDate")}
                className="form-control border  border-gray-200 p-2 rounded mt-3 w-full dark:text-white"
              />
            </div>
          </div>

          {/* Product Categories */}
          <div className="bg-white dark:bg-[var(--color-secondary-900)]  rounded-sm mb-5">
            <h3 className=" text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] font-bold border-b border-gray-200 p-3">
              Product Categories
            </h3>
            <div className="p-3">
              <p className="text-muted mb-2 font-medium text-sm text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]">
                <a
                  href="#"
                  className="float-end text-blue-500 dark:text-white underline"
                >
                  Add New
                </a>
                Select product category
              </p>
              <select
                id="Category"
                {...register("Category")}
                className="form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm
                rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500
                dark:focus:border-blue-500 w-full"
              >
                <option value="Appliances">Appliances</option>
                <option value="Automotive Accessories">
                  Automotive Accessories
                </option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Furniture">Furniture</option>
                <option value="Grocery">Grocery</option>
                <option value="Kids">Kids</option>
                <option value="Watches">Watches</option>
              </select>
            </div>
          </div>

          {/* Product Tags */}
          <div className="bg-white dark:bg-[var(--color-secondary-900)]  rounded-sm mb-5">
            <h3 className=" text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] font-bold border-b border-gray-200 p-3">
              Product Tags
            </h3>
            <div className="p-3">
              <input
                type="text"
                placeholder="Enter tags separated by commas"
                {...register("Tags")}
                className={clsx(textInputStyle, "w-full")}
              />
            </div>
          </div>

          {/* Short Description */}
          <div className="bg-white dark:bg-[var(--color-secondary-900)]  rounded-sm">
            <h3 className=" text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] font-bold border-b border-gray-200 p-3">
              Product Short Description
            </h3>
            <div className="p-3">
              <p className="mb-3 font-medium text-sm text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]">
                Add short description for product
              </p>
              <textarea
                rows="3"
                placeholder="Must enter minimum of a 100 characters"
                {...register("ShortDescription")}
                className={clsx(textInputStyle, "w-full")}
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </PageWrapper>
  );
}
