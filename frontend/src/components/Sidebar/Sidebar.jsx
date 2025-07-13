import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu as MenuIcon,
  X,
  LayoutDashboard,
  PlusCircle,
  List,
  Utensils,
  ClipboardList,
  Users,
  ListOrdered,
  PanelTopInactive,
  Activity,
  TrendingUp,
  Boxes,
  Receipt,
  PackageMinus,
  Store,
  Tags,
  Beef,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import "./Sidebar.css";

const Sidebar = () => {
  const { isAuthenticated, user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  if (!isAuthenticated || !user) return null;

  const toggleSidebar = () => setIsOpen((prev) => !prev);

const links = [ 
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
    roles: ["admin", "restaurantOwner", "guest"],
  },
  {
    to: "/inventory",
    label: "Stock Management",
    icon: <Boxes size={18} />,
    roles: ["restaurantOwner"],
  },
  {
    to: "/expenditure",
    label: "Expense Records",
    icon: <Receipt size={18} />,
    roles: ["restaurantOwner"],
  },
  {
    to: "/usage",
    label: "Stock Usage",
    icon: <PackageMinus size={18} />,
    roles: ["restaurantOwner"],
  },
  {
    to: "/sales",
    label: "Sales Records",
    icon: <TrendingUp size={18} />,
    roles: ["restaurantOwner"],
  },
  {
    to: "/restaurants",
    label: "Beef Seller List",
    icon: <Store size={18} />,
    roles: ["admin", "restaurantOwner", "guest"],
  },
  {
    to: `/categories/${user._id}`,
    label: "Beef Categories",
    icon: <Tags size={18} />,
    roles: ["admin", "restaurantOwner"],
  },
  {
    to: "/create-menu",
    label: "Add Beef Product",
    icon: <Beef size={18} />, // Note: 'Beef' icon doesn't exist in Lucide, suggest alternative below
    roles: ["restaurantOwner"],
  },
  {
    to: "/my-menus",
    label: "My Products",
    icon: <ClipboardList size={18} />,
    roles: ["admin", "restaurantOwner"],
  },
  {
    to: "/menus",
    label: "All Products",
    icon: <ClipboardList size={18} />,
    roles: ["admin", "restaurantOwner"],
  },
  {
    to: "/create-category",
    label: "Add Category",
    icon: <PlusCircle size={18} />,
    roles: ["restaurantOwner"],
  },
  {
    to: `/users`,
    label: "Users",
    icon: <Users size={18} />,
    roles: ["admin"],
  },
  {
    to: `/all-orders`,
    label: "Orders",
    icon: <ListOrdered size={18} />,
    roles: ["admin", "restaurantOwner", "guest"],
  },
];



  const filteredLinks = links.filter((link) => link.roles.includes(user.role));

  return (
    <>
      <button className="hamburger-btn" onClick={toggleSidebar}>
        {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
      </button>

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <nav className="sidebar-nav">
          {filteredLinks.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={() => setIsOpen(false)}
            >
              <span className="nav-icon">{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
