import { NavLink } from "react-router-dom";
import "../css/SideNav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDisplay,
  faHandsHolding,
  faMugSaucer,
} from "@fortawesome/free-solid-svg-icons";
import People from "@material-ui/icons/People";
import Dashboard from "@material-ui/icons/Dashboard";
import { useSelector } from "react-redux";

const SideNav = (props) => {
  const sidenav = useSelector((state) => state.sidenav);
  const employeesNumber = useSelector((state) => state.employees).length;

  const links = [
    {
      name: "dashboard",
      path: "/dashboard",
      icon: <Dashboard className="sidenav-icon" style={{ fontSize: "35px" }} />,
    },
    {
      name: "work place",
      path: "/workplace",
      icon: <FontAwesomeIcon className="sidenav-icon" icon={faDisplay} />,
    },
    {
      name: "holiday",
      path: "/holidays",
      icon: <FontAwesomeIcon className="sidenav-icon" icon={faMugSaucer} />,
    },
    {
      name: "employees",
      path: "/employees",
      icon: <People className="sidenav-icon" style={{ fontSize: "35px" }} />,
    },
    {
      name: "inbound requests",
      path: "/requests",
      icon: <FontAwesomeIcon className="sidenav-icon" icon={faHandsHolding} />,
    },
  ];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={sidenav ? "sidenav sidenav-active" : "sidenav"}
    >
      <ul className="sidenav-links">
        {links.map((link, index) => {
          return (
            <li key={index}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "sidenav-active" : "sidenav-link"
                }
                to={link.path}
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideNav;
