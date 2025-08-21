import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink
            to="/HomePage"
            className={({ isActive }) =>
              isActive ? "nav-btn active" : "nav-btn"
            }
          >
            🏠 Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/WatchlistPage"
            className={({ isActive }) =>
              isActive ? "nav-btn active" : "nav-btn"
            }
          >
            ❤️ Watchlist
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
