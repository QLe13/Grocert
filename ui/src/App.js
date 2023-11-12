import React, { Component,useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Client from "./Client";
import SearchBar from "./components/SearchBar/SearchBar";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import logo from "./images/BudgetBites.png";
import sampleGroceries from "./images/sampleGrocery.png";

const sampleItems = [
  {
    "id": 487654,
    "name": "Apple",
    "unit": "kg",
    "amount": 10,
    "image": "http://linktoappleimage.com",
    "category": "fruit"
  },
  {
    "id": 587965,
    "name": "Carrot",
    "unit": "bag",
    "amount": 3,
    "image": "http://linktocarrotimage.com",
    "category": "vegetables"
  },
  {
    "id": 698745,
    "name": "Milk",
    "unit": "liter",
    "amount": 2,
    "image": "http://linktomilkimage.com",
    "category": "dairy"
  },
  {
    "id": 798132,
    "name": "Bread",
    "unit": "loaf",
    "amount": 1,
    "image": "http://linktobreadimage.com",
    "category": "bakery"
  },
  {
    "id": 908765,
    "name": "Eggs",
    "unit": "dozen",
    "amount": 4,
    "image": "http://linktoeggsimage.com",
    "category": "poultry"
  },
  {
    "id": 487654,
    "name": "Apple",
    "unit": "kg",
    "amount": 10,
    "image": "http://linktoappleimage.com",
    "category": "fruit"
  },
  {
    "id": 587965,
    "name": "Carrot",
    "unit": "bag",
    "amount": 3,
    "image": "http://linktocarrotimage.com",
    "category": "vegetables"
  },
  {
    "id": 698745,
    "name": "Milk",
    "unit": "liter",
    "amount": 2,
    "image": "http://linktomilkimage.com",
    "category": "dairy"
  },
  {
    "id": 798132,
    "name": "Bread",
    "unit": "loaf",
    "amount": 1,
    "image": "http://linktobreadimage.com",
    "category": "bakery"
  },
  {
    "id": 908765,
    "name": "Eggs",
    "unit": "dozen",
    "amount": 4,
    "image": "http://linktoeggsimage.com",
    "category": "poultry"
  }

].map((item) => ({...item, "selected": false, "image": sampleGroceries})) 






const Home = () => {  

  const [search, setSearch] = useState("");
  const [haveSearched, setHaveSearch] = useState([]);
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(Math.ceil(haveSearched.length/itemsPerPage));


  useEffect(() => {
    setTotalPage(Math.ceil(haveSearched.length / itemsPerPage));
  }, [haveSearched]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = haveSearched.slice(indexOfFirstItem, indexOfLastItem);

  const toggleItemSelection = (ind) => {
    const newItems = [...haveSearched];
    newItems[ind].selected = !newItems[ind].selected;
    setHaveSearch(newItems);
  }

  const searchItem = () => {
    setHaveSearch([...sampleItems]);
    console.log(search);
    //remember to map the item to have a selected propertys
    // To do
  }

  return (
        haveSearched.length===0 ? (
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

          </div>

          </>
        )
      
    

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
