import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarLogo,
} from "flowbite-react";

// Mui Icons
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

//React Router
import { Link } from "react-router-dom";

// Image
import Logo from "../assets/imgs/logo-light.png";
// react
import { useState } from "react";
export default function SideBar() {
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
  return (
    <Sidebar
      aria-label="Default sidebar example"
      className="h-[100svh] "
    >
      <SidebarLogo href="#" img={Logo} imgAlt="logo" />
      <SidebarItems>
        <SidebarItemGroup>
          {menuItems.map((item, index) => {
            return (
              <SidebarItem
                key={index}
                as={Link}
                to={item.path}
                icon={item.icon}
                label={item.text}
                onClick={() => setActiveButton(index)}
                className={`${activeButton === index ? "bg-[green]" : ""} `}
              >
                {item.text}
              </SidebarItem>
            );
          })}
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
