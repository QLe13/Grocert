import React from "react";
import "./ShowCart.css";
import { useState } from "react";
import {axios} from "../../axios";
import CircularProgress from '@mui/material/CircularProgress';


const ShowCart = (props) => {

    const [zipCode, setZipCode] = useState("");
    const [getCalculateCartsLoading, setGetCalculateCartsLoading] = useState(false);

    const toggleRemoveItem = (ind) => {
        const newSessionCart = [...props.sessionCart];
        newSessionCart.splice(ind, 1);
        props.setSessionCart(newSessionCart);
    }

    const getCarts = async () => {
    try{
            const cart = await axios.post("/calculateCart", {
            zipCode: parseInt(zipCode, 10),
            itemIds: props.sessionCart.map((item) => item.id),
        });
        props.setShowCalculateCarts(true);
        props.setCalculateCarts(cart["data"]);
        setGetCalculateCartsLoading(false);
    } catch (err) {
        console.log(err);
        setGetCalculateCartsLoading(false);
    }}

    return (
        <div className="show-cart">
            <input className="show-cart-zipCode-input" 
            min={0} max={99999}
            type="number" 
            placeholder="Enter Zip Code:" value={zipCode} onChange={(e) => setZipCode(e.target.value)}/>
            <div className="show-cart-items">
                {props.sessionCart.map((item, ind) => {
                    return (
                        <div 
                        className="show-cart-item-info"
                        key={ind}
                        >
                            <div className="show-cart-item-name">{item.name}</div>
                            <div className="show-cart-item-remove" 
                                 onClick={() => toggleRemoveItem(ind)}>-</div>
                        </div>
                    )
                })}
            </div>
            <div className="show-cart-get-cart">
                {
                    !getCalculateCartsLoading ?
                    <button className="show-cart-get-cart-button" onClick={()=>{
                        setGetCalculateCartsLoading(true);
                        getCarts();
                    }}>Get Carts</button> :
                    <CircularProgress color="inherit" />
                }
            </div>
        </div>
    )
}


export default ShowCart;