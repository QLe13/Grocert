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
import AboutUs from "./components/AboutUs/AboutUs";
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

  // for pagination
  const maxPagesOnScreen = 8;
  const [firstPageOnScreen, setFirstPageOnScreen] = useState(1);



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

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const newCurrentPage = currentPage - 1;
      if (newCurrentPage < firstPageOnScreen) {
        setFirstPageOnScreen(Math.max(1, newCurrentPage - maxPagesOnScreen + 1));
      }
      setCurrentPage(newCurrentPage);
    }
  };
  const handlePreviousPageRange = () => {
    if (firstPageOnScreen > 1) {
      const newFirstPageOnScreen = Math.max(1, firstPageOnScreen - maxPagesOnScreen);
      setFirstPageOnScreen(newFirstPageOnScreen);
      setCurrentPage(newFirstPageOnScreen);
    }
  };
  const handleNextPageRange = () => {
    if (firstPageOnScreen + maxPagesOnScreen - 1 < totalPage) {
      const newFirstPageOnScreen = firstPageOnScreen + maxPagesOnScreen;
      setFirstPageOnScreen(newFirstPageOnScreen);
      setCurrentPage(newFirstPageOnScreen);
    }
  };

  
  const handleNextPage = () => {
    if (currentPage < totalPage) {
      const newCurrentPage = currentPage + 1;
      if (newCurrentPage > firstPageOnScreen + maxPagesOnScreen - 1) {
        setFirstPageOnScreen(newCurrentPage);
      }
      setCurrentPage(newCurrentPage);
    }
  };
  
  
  


  const toggleItemSelection = (ind) => {
    // Calculate the actual index in the haveSearched array
    const actualIndex = (currentPage - 1) * itemsPerPage + ind;
  
    const newItems = [...haveSearched];
    newItems[actualIndex].selected = !newItems[actualIndex].selected;
    setHaveSearch(newItems);
  
    const newSessionCart = [...sessionCart];
    if (newItems[actualIndex].selected) {
      const existed = newSessionCart.find((item) => item.id === newItems[actualIndex].id);
      if (existed) return;
      newSessionCart.push(newItems[actualIndex]);
    } else {
      const index = newSessionCart.findIndex((item) => item.id === newItems[actualIndex].id);
      newSessionCart.splice(index, 1);
    }
    setSessionCart(newSessionCart);
  }
  
  


  // handle searching and switching UI
  const searchItem = async (e) => {
    e.preventDefault();// prevent page from refreshing
    try {
      const res = await axios.get(`/itemSearch?searchTerm=${search}`);
      const innerData = res.data; // Accessing the first element which is the actual array of items
      const mappedData = innerData.map((item) => ({
        ...item,
        "selected": false,
        "image": sampleGroceries,
      }));
      //reset session cart
      setHaveSearch(mappedData);
      //reset pagination
      setCurrentPage(1);
      setFirstPageOnScreen(1);
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
                      <div 
                        className="search-result-item"
                        key={item.id}
                        >
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
                  <div className="search-result-previous" onClick={handlePreviousPageRange}>
                      <div className="search-result-previous-text" 
                      >&#8249;&#8249;</div>
                  </div>
                  <div className="search-result-previous" onClick={handlePreviousPage}>
                    <div className="search-result-previous-text">&#8249;</div>
                  </div>
                  {
                    firstPageOnScreen > 1 && <div className="search-result-pagination-item">...</div>
                  }
                    {
                      Array.from({length: (firstPageOnScreen+ maxPagesOnScreen <= totalPage)? maxPagesOnScreen : totalPage - firstPageOnScreen + 1 }, 
                      (_, i) => i + firstPageOnScreen).map((_, index) => (
                        <div 
                          key={firstPageOnScreen + index}
                          className="search-result-pagination-item" 
                          style={
                            {
                              backgroundColor: currentPage === firstPageOnScreen + index ? "#B1D8B7" : "#FFF7E1",
                            }
                          }
                          onClick={() => setCurrentPage(firstPageOnScreen+ index)}>{firstPageOnScreen+ index}
                        </div>
                      ))
                    }
                  {
                    firstPageOnScreen + maxPagesOnScreen - 1 < totalPage && <div className="search-result-pagination-item">...</div>
                  }
                  <div className="search-result-next" onClick={handleNextPage}>
                      <div className="search-result-next-text">&#8250;</div>
                  </div>
                  <div className="search-result-next" onClick={handleNextPageRange}>
                      <div className="search-result-next-text">
                        &#8250;&#8250;
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
            <Route path="about" element={<AboutUs/>}/>
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
