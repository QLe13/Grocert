import React from "react";
import "./SearchBar.css";


const SearchBar = (props) => {
    return (
        <form className="search-bar" onSubmit={props.searchItem}>
            <input
                type="text"
                placeholder="Search your item..."
                onChange={(e) => props.setSearch(e.target.value)}
            />
            <button type="submit" className="search-icon" onClick={props.searchItem}>🔍</button>
        </form>
    );
}

export default SearchBar;