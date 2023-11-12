import React from 'react';
import "./NavBar.css";


const NavBar = () => {
    return (
      <nav className="top-nav-bar">
          <div className="logo">BudgetBites</div>
          <div className="nav-links">
              <button>About us</button>
              <button>Groceries</button>
              <button>Cart(0)</button>
          </div>
          <button className="support-button">Support</button>
      </nav>
    );
  }

export default NavBar;