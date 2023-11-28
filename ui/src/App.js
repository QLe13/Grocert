import React, { Component,useState, useEffect } from "react";
import {axios} from "./axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Client from "./Client";
import SearchBar from "./components/SearchBar/SearchBar";
import NavBar from "./components/NavBar/NavBar";
import ShowCart from "./components/ShowCart/ShowCart";
import GetCarts from "./components/GetCarts/GetCarts";
import "./App.css";
import logo from "./images/BudgetBites.png";
import sampleGroceries from "./images/sampleGrocery.png";



const Home = () => {  

  const [search, setSearch] = useState("");
  const [haveSearched, setHaveSearch] = useState([]);

  // for pagination
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(Math.ceil(haveSearched.length/itemsPerPage));
  const [currentItems, setCurrentItems] = useState([]);
  //

  // for session cart: items that are selected at the moment
  const [sessionCart, setSessionCart] = useState([]);
  //

  // for calculated carts: storing calculated carts returned from the api
  const [calculateCarts, setCalculateCarts] = useState([]);
  const [showCalculateCarts, setShowCalculateCarts] = useState(false);
  //


  useEffect(() => {
    setTotalPage(Math.ceil(haveSearched.length / itemsPerPage));
  }, [haveSearched]);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const newCurrentItems = haveSearched.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(newCurrentItems);
  }, [currentPage, haveSearched]);


  const toggleItemSelection = (ind) => {
    const newItems = [...haveSearched];
    newItems[ind].selected = !newItems[ind].selected;
    setHaveSearch(newItems);
    const newSessionCart = [...sessionCart];
    if (newItems[ind].selected) {
      const existed = newSessionCart.find((item) => item.id === newItems[ind].id);
      if (existed) return;
      newSessionCart.push(newItems[ind]);
    } else {
      const index = newSessionCart.findIndex((item) => item.id === newItems[ind].id);
      newSessionCart.splice(index, 1);
    }
    setSessionCart(newSessionCart);
  }
  


  // handle searching and switching UI
  const searchItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/itemSearch?searchTerm=${search}`);
      const innerData = res.data; // Accessing the first element which is the actual array of items
      const mappedData = innerData.map((item) => ({
        ...item,
        "selected": false,
        "image": sampleGroceries,
      }));
      console.log(mappedData);
      setHaveSearch(mappedData);
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
      <>
        {haveSearched.length===0 ? (
          <>
            <div className="home">
                <div className="home-logo">
                  <img src={logo} alt="BudgetBites Logo"/>
                </div>
                <div className="home-search-bar">
                  <SearchBar setSearch = {setSearch} searchItem = {searchItem}/>
                </div>
            </div>
          </>
        ) : (
          <>
          <div className="search">
            <div className="search-sections">
              <div className="search-sections-search-bar">
                <SearchBar setSearch={setSearch} searchItem={searchItem}/>
              </div>
              <div className="search-result-container">
                <div className="search-result">
                  {
                    currentItems.map((item, ind) => (
                      <div className="search-result-item">
                        <div className="search-result-item-inner"
                        style={
                                {
                                  backgroundColor: item.selected ? "#B1D8B7" : "#FFF7E1",
                                }
                              } 
                        onClick={()=> toggleItemSelection(ind)} 
                        >
                          <div className="search-result-item-front">
                            <img src={item.image} alt={item.name}/>
                          </div>
                          <div className="search-result-item-back">
                            <div className="search-result-item-name">{item.name}: </div>
                            <div className="search-result-item-amount">{item.amount} {item.unit}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className="search-result-pagination">
                  <div className="search-result-previous">
                    <div className="search-result-previous-text" onClick={()=>
                      {
                        if(currentPage>1){
                          setCurrentPage(currentPage-1)
                        }
                      }
                    }>&#8249;</div>
                  </div>
                    {
                      Array(totalPage).fill(0).map((_, index) => (
                        <div className="search-result-pagination-item" onClick={() => setCurrentPage(index + 1)}>{index + 1}</div>
                      ))
                    }
                  <div className="search-result-next">
                      <div className="search-result-next-text" onClick={() => {
                        if (currentPage < totalPage) {
                          setCurrentPage(currentPage + 1)
                        }
                      }
                      }>&#8250;
                      </div>
                   </div>
                </div>
              </div>
            </div>
            <div className="current-cart">
                <ShowCart sessionCart = {sessionCart} setSessionCart={setSessionCart} setShowCalculateCarts={setShowCalculateCarts} setCalculateCarts={setCalculateCarts}/>
            </div>
          </div>

          </>
        )}
        {showCalculateCarts && <GetCarts calculateCarts={calculateCarts} setCalculateCarts={setCalculateCarts} setShowCalculateCarts={setShowCalculateCarts}/>}
      </>
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
            <Route path="/" element={<Home />}/>
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
