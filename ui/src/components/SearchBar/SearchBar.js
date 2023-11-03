import React from "react";
import "./SearchBar.css";

const SearchBar = (props) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search your item..."
            />
            <button className="search-icon">🔍</button>
        </div>
    );
}

export default SearchBar;