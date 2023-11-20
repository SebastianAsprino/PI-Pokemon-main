import { Link } from "react-router-dom";
import SearchBar from "../searchbar/searchbar";
import Filter from "../filter/filter";
import "./navbar.css"; // Importa el archivo CSS que creaste

const NavBar = () => {
  function loaderpage() {
    window.location.reload()
  }

  return (
    <nav className="navbar">
      <a className="github" href="https://github.com/SebastianAsprino/" target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
      <Link to="/form">
        <button className="add-pokemon">
          Add Pokemon
        </button>
      </Link>
      <button className="home" onClick={loaderpage}>
        Home
      </button>
      <div>
        <SearchBar />
      </div>
      <div>
        <Filter />
      </div>
    </nav>
  );
};

export default NavBar;
