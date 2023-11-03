import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Client from "./Client";
import SearchBar from "./components/SearchBar/SearchBar";
import "./App.css";




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

const Home = () => {  
  return (
    <div className="home">
        <SearchBar />
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };
  }

  async componentDidMount() {
    Client.getSummary((summary) => {
      this.setState({
        title: summary.content,
      });
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
