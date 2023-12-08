import { Apps } from "react-ionicons";
import { FaTools, FaCube, FaDollarSign, FaBicycle, FaUserFriends } from "react-icons/fa";

export const sidebarItems = [
  {
    name: "Dashboard",
    icon: Apps,
    current: true,
    href: "/",
  },
  {
    name: "Customers",
    icon: FaUserFriends,
    current: true,
    children: [
      { name: "Corporate Customers", href: "/customers/corporate" },
      { name: "Mobile Customers", href: "/customers/mobile" },
    ],
  },
  {
    name: "Riders",
    icon: FaBicycle,
    current: true,
    children: [
      { name: "Corporate Riders", href: "/riders/corporate" },
    ],
  },
  {
    name: "Deliveries",
    icon: FaCube,
    current: true,
    href: "/deliveries",
  },
  {
    name: "Management",
    icon: FaTools,
    current: true,
    children: [
      { name: "User Management", href: "/management/users" },
      { name: "Fare Management", href: "/management/fare" },
      // { name: "Promo Codes", href: "/management/codes" },
    ],
  },
  {
    name: "Finance",
    icon: FaDollarSign,
    current: true,
    children: [
      { name: "Payments", href: "/finance/payments" },
      { name: "Record Search", href: "/finance/record" },
    ],
  },
];
