import { NavLink } from "react-router-dom";
export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/HomePage">Hemma -tindersvepande</NavLink>
        </li>
        <li>
          <NavLink to="/WatchlistPage">filmlista</NavLink>
        </li>
      </ul>
    </nav>
  );
};
