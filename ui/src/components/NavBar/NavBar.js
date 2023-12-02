import React from 'react';
import "./NavBar.css";
import { useCookies } from 'react-cookie';


const NavBar = (props) => {
  const [cookies] = useCookies(['userSelectedCarts']);


  const handleReload = () => {
    window.location.href = "/"
  }
  const handleAbout = () => {
    window.location.href = "/about"
  }
  const handleSavedCarts = () => {
    if (cookies.userSelectedCarts && cookies.userSelectedCarts.length > 0) {
      window.location.href = "/savedCarts";
    }
  }
    return (
      <nav className="top-nav-bar">
          <div className="logo" onClick={handleReload}>BudgetBites</div>
          <div className="nav-links">
              <button onClick={handleAbout}>About us</button>
              <button>Groceries</button>
              <button onClick={handleSavedCarts}>Carts({(cookies.userSelectedCarts && cookies.userSelectedCarts.length > 0) ? cookies.userSelectedCarts.length: 0})</button>
          </div>
          <button className="support-button">Support</button>
      </nav>
    );
  }


export default NavBar;