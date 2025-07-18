import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu as MenuIcon,
  LayoutDashboard,
  X,
  Newspaper,
  CalendarDays,
  Plus,
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
      roles: ["user", "admin", "moderator", "superadmin"],
    },
    {
      to: "/create-newsandevents",
      label: "Create News/Events/Project",
      icon: <Plus size={18} />,
      roles: ["user", "admin", "moderator", "superadmin"],
    },
    {
      to: "/news",
      label: "News",
      icon: <Newspaper size={18} />,
      roles: ["user", "admin", "moderator", "superadmin"],
    },
    {
      to: "/project",
      label: "Projects",
      icon: <Newspaper size={18} />,
      roles: ["user", "admin", "moderator", "superadmin"],
    },
    {
      to: "/events",
      label: "Events",
      icon: <CalendarDays size={18} />,
      roles: ["user", "admin", "moderator", "superadmin"],
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
