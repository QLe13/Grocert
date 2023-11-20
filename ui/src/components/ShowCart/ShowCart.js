import React from "react";
import "./ShowCart.css";
import { useState } from "react";


const ShowCart = (props) => {

    const [zipCode, setZipCode] = useState("");

    const toggleRemoveItem = (ind) => {
        const newSessionCart = [...props.sessionCart];
        newSessionCart.splice(ind, 1);
        props.setSessionCart(newSessionCart);
    }

    return (
        <div className="show-cart">
            <input className="show-cart-zipCode-input" 
            min={0} max={99999}
            type="number" 
            placeholder="Enter Zip Code:" value={zipCode} onChange={(e) => setZipCode(e.target.value)}/>
            <div className="show-cart-items">
                {props.sessionCart.map((item, ind) => {
                    return (
                        <div className="show-cart-item-info">
                            <div className="show-cart-item-name">{item.name}</div>
                            <div className="show-cart-item-remove" 
                                 onClick={() => toggleRemoveItem(ind)}>-</div>
                        </div>
                    )
                })}
            </div>
            <div className="show-cart-get-cart">
                <button className="show-cart-get-cart-button">Get Cart</button>
            </div>
        </div>
    )
}


export default ShowCart;