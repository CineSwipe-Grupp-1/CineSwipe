import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

export const Navbar = () => {
  return (
    <nav className='navbar' aria-label='Huvudmeny'>
      <ul>
        <li>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? 'nav-btn active' : 'nav-btn'
            }
          >
            🏠 Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/watchlist'
            className={({ isActive }) =>
              isActive ? 'nav-btn active' : 'nav-btn'
            }
          >
            ❤️ Filmlista
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
