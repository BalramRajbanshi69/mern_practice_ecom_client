import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import ProductContext from "../context/ProductContext";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [toggle, setToggle] = useState("Light Mode"); 
  const [theme, setTheme] = useState("dark");     

  const {
    state: { cart },
  } = useContext(ProductContext);

  const handleClick = () => {
    if (theme === "dark") {
      setTheme("light");
      setToggle("Dark Mode"); 
    } else {
      setTheme("dark");
      setToggle("Light Mode"); 
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className={`bg-${theme}`}>
      <div className="container">
        <div className="row">
          <div className="col-12 py-2">
            <nav className={`navbar navbar-expand-lg navbar-${theme}`}>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link active  " to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/products">
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/services">
                      Services
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/contact">
                      Contact
                    </Link>
                  </li>
                  
                  <li className="nav-item">
                    <Link className="nav-link active" to="/sign_up">
                      Sign Up
                    </Link>
                  </li>
                </ul>
                <form onSubmit={handleSearchSubmit} className="d-flex">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button
                    className="btn btn-outline-success my-2 my-sm-0"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
                <Link to="/cart_items">
                  <button
                    type="button"
                    className="btn btn-primary position-relative mx-5"
                  >
                    <FaCartArrowDown size={20} />
                    <span className="position-absolute top-0 start-100 translate-middle-x badge rounded-pill bg-danger">
                      {cart.length}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </button>
                </Link>
                <button className="btn btn-success" onClick={handleClick}>
                  {toggle}
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;










