import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";

import axios from "axios";
import { useEffect, useState } from "react";

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [promo, setPromo] = useState("VELZON15");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    async function getShoppingItems() {
      try {
        const response = await axios.get("/Api/shoppingCart.json");
        setCartItems(response.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(true);
        console.log(err);
      }
    }
    getShoppingItems();
  }, []);

  const subTotal = cartItems.reduce(
    (sum, item) => sum + item.count * item.productPrice,
    0
  );
  const shipping = cartItems.length > 0 ? 65 : 0;
  const tax = subTotal * 0.125;
  const total = subTotal - discount + shipping + tax;

  // handlers
  const handleQuantityChange = (id, value) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === id ? { ...item, count: Number(value) } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== id));
  };

  const handleApplyPromo = () => {
    if (promo === "VELZON15") {
      setDiscount(subTotal * 0.15);
    } else {
      setDiscount(0);
    }
  };

  return (
    <PageWrapper className="flex flex-col xl:flex-row gap-5 p-5">
      {/* Cart Items */}
      <div className="relative flex-1 h-fit pb-10">
        <div className="flex justify-between items-center gap-5 py-5 text-sm text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]">
          Your Cart ({!isLoading && cartItems.length} items)
          <Link
            to="/Products"
            className="underline  text-[#41528a] dark:text-white"
          >
            Continue Shopping
          </Link>
        </div>
        <div className="items">
          {!isLoading &&
            cartItems.map((item) => {
              return (
                <Item
                  key={item.productId}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              );
            })}
        </div>
        <Link
          to="/Checkout"
          className="bg-[#0ab39c] px-4 cursor-pointer absolute right-0 bottom-0 py-2 rounded-sm text-white"
        >
          checkout
        </Link>
      </div>

      {/* Order Summary */}
      <div className="w-full xl:w-1/3 sticky top-20 h-fit">
        <div className=" bg-white dark:bg-[var(--color-secondary-900)] rounded-sm shadow-sm">
          <div className=" ">
            <h3 class="text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] font-semibold p-3 border-b border-dashed border-gray-200 dark:border-[#94a3d465]">
              Order Summary
            </h3>
          </div>

          <div className="border-b border-dashed border-gray-200 dark:border-[#94a3d465] py-8 px-5 bg-[#fafcfc] dark:bg-[#282b2e] dark:text-gray-200">
            <div className="text-center">
              <h6 className="mb-2 ">
                Have a <span className="font-semibold">promo</span> code ?
              </h6>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                className="form-control flex-1 border rounded p-2"
                placeholder="Enter coupon code"
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                className="bg-[#0ab39c] px-4 cursor-pointer rounded-sm text-white"
              >
                Apply
              </button>
            </div>
          </div>

          <div className=" p-5">
            <table className="w-full text-sm ">
              <tbody>
                <tr className="dark:text-gray-300">
                  <td className="pb-3">Sub Total :</td>
                  <td className="text-end pb-3">${subTotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="pb-3 dark:text-gray-300">
                    Discount{" "}
                    {discount > 0 && (
                      <span className="text-gray-400">(VELZON15)</span>
                    )}
                    :
                  </td>
                  <td className="text-end text-red-500 pb-3">
                    -${discount.toFixed(2)}
                  </td>
                </tr>
                <tr className="dark:text-gray-300">
                  <td className="pb-3">Shipping Charge :</td>
                  <td className="text-end pb-3">${shipping.toFixed(2)}</td>
                </tr>
                <tr className="dark:text-gray-300">
                  <td className="pb-3">Estimated Tax (12.5%) :</td>
                  <td className="text-end pb-3">${tax.toFixed(2)}</td>
                </tr>
                <tr className="font-semibold border-t border-dashed border-gray-200 dark:border-[#94a3d465] pt-3 dark:text-gray-300">
                  <td>Total (USD) :</td>
                  <td className="text-end pt-3">${total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

function Item({ item, onQuantityChange, onRemove }) {
  return (
    <div className="bg-white dark:bg-[var(--color-secondary-900)] rounded-sm mb-5">
      <div className="flex justify-between flex-wrap p-5 gap-5">
        <div className="flex flex-wrap gap-5">
          <div className="p-4 w-25 h-25 bg-gray-200 rounded-sm dark:bg-[#282b2e]">
            <img
              src={item.image}
              alt="Product Image"
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <h3 className="text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]">
              {item.productName}
            </h3>
            <div className="flex gap-5 my-2 text-gray-400 text-sm">
              <span>
                Color : <span>{item.color}</span>
              </span>
              <span>
                Size : <span>{item.size}</span>
              </span>
            </div>
            <input
              type="number"
              min={1}
              value={item.count}
              onChange={(e) => onQuantityChange(item.productId, e.target.value)}
              className="text-sm border border-gray-200 rounded p-2 w-16 dark:text-white"
            />
          </div>
        </div>
        <span className="text-sm text-gray-400">
          Item Price:
          <span className="font-semibold text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]">
            {" "}
            ${item.productPrice}
          </span>
        </span>
      </div>
      <div className="flex justify-between items-center gap-5 p-5 flex-wrap border-t border-gray-200">
        <div>
          <button
            onClick={() => onRemove(item.productId)}
            className="cursor-pointer text-gray-400 text-sm inline-flex gap-2 items-center mr-4"
          >
            <DeleteIcon fontSize="" />
            Remove
          </button>
          <button className="cursor-pointer text-gray-400 text-sm inline-flex gap-2 items-center">
            <StarIcon fontSize="" />
            Add Wishlist
          </button>
        </div>
        <span className="text-gray-400 text-sm">
          Total :
          <span className="font-semibold text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)]">
            {" "}
            ${(item.count * item.productPrice).toFixed(2)}
          </span>
        </span>
      </div>
    </div>
  );
}
