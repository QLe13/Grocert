import React from "react";

import "./Pagination.css";

const Pagination = (props) => {
    
    return (
        <div className="pagination">
            <button className="pagination__button" onClick={() => props.prevPage()}>Previous</button>
            <button className="pagination__button" onClick={() => props.nextPage()}>Next</button>
        </div>
    );
    }

export default Pagination;