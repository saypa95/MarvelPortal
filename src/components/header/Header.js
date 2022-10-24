import { Link, NavLink } from "react-router-dom";
import "./header.scss";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title">
        <Link to="MarvelPortal">
          <span>Marvel</span> information portal
        </Link>
      </h1>
      <nav className="header__menu">
        <ul className="header__menu-list">
          <li>
            <NavLink
              end
              to="MarvelPortal"
              className={({ isActive }) =>
                "header__menu-list-item" + (isActive ? " header__menu-list-item_active" : "")
              }
            >
              Characters
            </NavLink>
          </li>
          /
          <li>
            <NavLink
              to="MarvelPortal/comics"
              className={({ isActive }) =>
                "header__menu-list-item" + (isActive ? " header__menu-list-item_active" : "")
              }
            >
              Comics
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
