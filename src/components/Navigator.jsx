//React Router
import { Link } from "react-router-dom";
// Image
import Logo from "../assets/imgs/logo-light.png";
// react
import { useState } from "react";
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
import { useSelector } from "react-redux";

const navigationWidth = 240;
export default function Navigator() {
  const { themeMode } = useSelector((state) => state.theme);
  const [activeButton, setActiveButton] = useState(0);
  const menuItems = [
    {
      text: "Dashboard",
      icon: DashboardIcon,
      path: "/Home",
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

  const asideStyle = {
    width: `${navigationWidth}px`,
    backgroundColor:
      themeMode === "light"
        ? "var(--color-primary-light)"
        : "var(--color-primary-dark)",
  };

  const listItemStyle = (index) => {
    return `duration-200 text-md dark:text-[var(--color-text-800)] hover:text-[var(--color-text-500)]  ${
      activeButton === index
        ? "!text-[var(--color-text-500)] "
        : "text-[var(--color-text-700)] "
    } 
    `;
  };

  function MenuItems() {
    return menuItems.map((item, index) => {
      return (
        <li
          key={index}
          icon={item.icon}
          label={item.text}
          onClick={() => setActiveButton(index)}
          className={listItemStyle(index)}
        >
          <item.icon fontSize="small" className="mr-2" />
          <Link to={item.path}>{item.text}</Link>
        </li>
      );
    });
  }

  return (
    <aside className="h-[100svh] p-3 shadow-sm" style={asideStyle}>
      <Link to="/" className=" py-8 border-b border-[#94a3d465] block">
        <img src={Logo} alt="logo" className="w-30 mx-auto" />
      </Link>
      <ul className="flex flex-col gap-7 pt-8">{<MenuItems />}</ul>
    </aside>
  );
}
