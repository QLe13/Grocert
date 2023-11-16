import React from "react";
import "./ShowCart.css";
import { useState } from "react";

// const sampleItems = [
//     {
//       "id": 487654,
//       "name": "Apple",
//       "unit": "kg",
//       "amount": 10,
//       "image": "http://linktoappleimage.com",
//       "category": "fruit"
//     },
//     {
//       "id": 587965,
//       "name": "Carrot",
//       "unit": "bag",
//       "amount": 3,
//       "image": "http://linktocarrotimage.com",
//       "category": "vegetables"
//     },
//     {
//       "id": 698745,
//       "name": "Milk",
//       "unit": "liter",
//       "amount": 2,
//       "image": "http://linktomilkimage.com",
//       "category": "dairy"
//     },
//     {
//       "id": 798132,
//       "name": "Bread",
//       "unit": "loaf",
//       "amount": 1,
//       "image": "http://linktobreadimage.com",
//       "category": "bakery"
//     },
//     {
//       "id": 908765,
//       "name": "Eggs",
//       "unit": "dozen",
//       "amount": 4,
//       "image": "http://linktoeggsimage.com",
//       "category": "poultry"
//     },
//     {
//       "id": 487654,
//       "name": "Apple",
//       "unit": "kg",
//       "amount": 10,
//       "image": "http://linktoappleimage.com",
//       "category": "fruit"
//     },
//     {
//       "id": 587965,
//       "name": "Carrot",
//       "unit": "bag",
//       "amount": 3,
//       "image": "http://linktocarrotimage.com",
//       "category": "vegetables"
//     },
//     {
//       "id": 698745,
//       "name": "Milk",
//       "unit": "liter",
//       "amount": 2,
//       "image": "http://linktomilkimage.com",
//       "category": "dairy"
//     },
//     {
//       "id": 798132,
//       "name": "Bread",
//       "unit": "loaf",
//       "amount": 1,
//       "image": "http://linktobreadimage.com",
//       "category": "bakery"
//     },
//     {
//       "id": 908765,
//       "name": "Eggs",
//       "unit": "dozen",
//       "amount": 4,
//       "image": "http://linktoeggsimage.com",
//       "category": "poultry"
//     },
//     {
//       "id": 698745,
//       "name": "Milk",
//       "unit": "liter",
//       "amount": 2,
//       "image": "http://linktomilkimage.com",
//       "category": "dairy"
//     },
//     {
//       "id": 798132,
//       "name": "Bread",
//       "unit": "loaf",
//       "amount": 1,
//       "image": "http://linktobreadimage.com",
//       "category": "bakery"
//     },
//     {
//       "id": 908765,
//       "name": "Eggs",
//       "unit": "dozen",
//       "amount": 4,
//       "image": "http://linktoeggsimage.com",
//       "category": "poultry"
//     },
//     {
//       "id": 487654,
//       "name": "Apple",
//       "unit": "kg",
//       "amount": 10,
//       "image": "http://linktoappleimage.com",
//       "category": "fruit"
//     },
//     {
//       "id": 587965,
//       "name": "Carrot",
//       "unit": "bag",
//       "amount": 3,
//       "image": "http://linktocarrotimage.com",
//       "category": "vegetables"
//     },
//     {
//       "id": 698745,
//       "name": "Milk",
//       "unit": "liter",
//       "amount": 2,
//       "image": "http://linktomilkimage.com",
//       "category": "dairy"
//     },
//     {
//       "id": 798132,
//       "name": "Bread",
//       "unit": "loaf",
//       "amount": 1,
//       "image": "http://linktobreadimage.com",
//       "category": "bakery"
//     },
//     {
//       "id": 908765,
//       "name": "Eggs",
//       "unit": "dozen",
//       "amount": 4,
//       "image": "http://linktoeggsimage.com",
//       "category": "poultry"
//     }
  
//   ]

const ShowCart = (props) => {

    const [zipCode, setZipCode] = useState("");
    const [cartItems, setCartItems] = useState([]);



    return (
        <div className="show-cart">
            <input className="show-cart-zipCode-input" 
            min={0} max={99999}
            type="number" 
            placeholder="Enter Zip Code:" value={zipCode} onChange={(e) => setZipCode(e.target.value)}/>
            <div className="show-cart-items">
                {cartItems.map((item) => {
                    return (
                        <div className="show-cart-item-info">
                            <div className="show-cart-item-name">{item.name}</div>
                            <div className="show-cart-item-remove">-</div>
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