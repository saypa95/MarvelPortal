import "./header.scss";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title">
        <a href="#">
          <span>Marvel</span> information portal
        </a>
      </h1>
      <nav className="header__menu">
        <ul className="header__menu-list">
          <li className="header__menu-list-item header__menu-list-item_active">
            <a href="#">Characters</a>
          </li>
          /
          <li className="header__menu-list-item">
            <a href="#">Comics</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
