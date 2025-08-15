//React Router
import { Link, useLocation } from "react-router-dom";
// Image
import Logo from "../assets/imgs/logo-light.png";
import LogoSm from "../assets/imgs/logo-sm.png";
// react
// import { useState } from "react";
// mui icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SellIcon from "@mui/icons-material/Sell";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";
// clsx
import clsx from "clsx";

export default function Navigator({ collapseMenu }) {
  const location = useLocation();

  const menuItems = [
    {
      text: "Dashboard",
      icon: DashboardIcon,
      path: "/",
    },
    {
      text: "Products",
      icon: CategoryIcon,
      path: "/Products",
    },
    {
      text: "Check out",
      icon: ShoppingCartCheckoutIcon,
      path: "/Checkout",
    },
    {
      text: "Create Product",
      icon: BorderColorIcon,
      path: "/CreateProduct",
    },
    { text: "Orders", icon: SellIcon, path: "/Orders" },
    {
      text: "Customers",
      icon: SupportAgentIcon,
      path: "/Customers",
    },
    {
      text: "Product Details",
      icon: SettingsSuggestIcon,
      path: "/ProductDetails",
    },
    {
      text: "Sellers",
      icon: SettingsAccessibilityIcon,
      path: "/Sellers",
    },
    {
      text: "Sellers Details",
      icon: ManageAccountsIcon,
      path: "/SellersDetails",
    },
    {
      text: "Shopping Cart",
      icon: ShoppingCartIcon,
      path: "/ShoppingCart",
    },
    {
      text: "Order Details",
      icon: LocalMallIcon,
      path: "/OrderDetails",
    },
  ];

  const asideStyle = clsx(
    "h-[100vh] p-3 shadow-sm w-fit min-md:w-[240px] overflow-y-auto fixed top-0 left-0  dark:bg-[var(--color-primary-dark)] bg-[var(--color-primary-light)]",
    collapseMenu && "!min-w-[54px] !max-w-[54px]"
  );

  const listItemStyle = (path) => {
    return `duration-200 text-md dark:text-[var(--color-text-800)] hover:text-[var(--color-text-500)]  ${
      location.pathname === path
        ? "!text-[var(--color-text-500)] "
        : "text-[var(--color-text-700)] "
    } 
   ${collapseMenu && "text-center"}
   flex
    `;
  };

  function MenuItems() {
    return menuItems.map((item, index) => {
      return (
        <li key={index} className={listItemStyle(item.path)}>
          <Link
            className={clsx("grow")}
            to={item.path}
          >
            <item.icon
              fontSize="small"
              className={clsx("min-md:mr-2", collapseMenu && "!mr-0")}
            />
            <span
              className={clsx(
                "hidden min-md:inline",
                collapseMenu && "!hidden"
              )}
            >
              {item.text}
            </span>
          </Link>
        </li>
      );
    });
  }

  return (
    <aside className={asideStyle}>
      <Link to="/" className=" py-8 border-b border-[#94a3d465] block">
        <img
          src={Logo}
          alt="logo"
          className={clsx(
            "mx-auto hidden min-md:block min-md:w-[120px]",
            collapseMenu && "!hidden"
          )}
        />
        <img
          src={LogoSm}
          alt="logo"
          className={clsx(
            "mx-auto w-[30px]  min-md:hidden",
            collapseMenu && "!block"
          )}
        />
      </Link>
      <ul className="flex flex-col gap-7 pt-8 pb-5 overflow-hidden">
        <MenuItems />
      </ul>
    </aside>
  );
}
