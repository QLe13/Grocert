import React from "react";
import "./GetCarts.css";
import { useState, useEffect } from "react";
import {useCookies} from 'react-cookie';


  

const GetCarts = (props) => {
    const carts = props.calculateCarts;

    const [selectedCarts, setSelectedCarts] = useState([]); 

    useEffect(() => {
        setSelectedCarts(carts.map((cart) => false));
    }, [carts]);

    // checking if cookies is available
    const [cookies, setCookie] = useCookies(['userSelectedCarts']);


    const [showingCarts, setShowingCarts] = useState(carts.map((cart) => false));



    const handleSaveSelectedCartsToCookie = () => {
        const selectedCartsWithValues = carts.filter((_, index) => selectedCarts[index]);
        if (!cookies.userSelectedCarts) {
            setCookie('userSelectedCarts', selectedCartsWithValues, {path: '/'});
        } else {
            selectedCartsWithValues.forEach((selectedCart) => {
                cookies.userSelectedCarts.push(selectedCart);
                }
            );
            setCookie('userSelectedCarts', cookies.userSelectedCarts, {path: '/'});
        }
        props.setCalculateCarts([]);
        props.setShowCalculateCarts(false);
    }

    return (
            <div className="get-carts-wrapper">
                <div className="get-carts-header">
                    <div className="get-carts-title">Availability - Click to select</div>
                    <button className="get-carts-description"
                    onClick={() => {
                        props.setCalculateCarts([])
                        props.setShowCalculateCarts(false)
                    }}
                    >&#x2715;</button>
                </div>
                <div className="get-carts-result">
                    {
                        carts.map((cart, ind) => (
                            <div 
                                className={`get-carts-store ${selectedCarts[ind] ? 'selected' : ''}`}
                                key={cart.storeId}
                            >
                                <div className="get-carts-store-small">
                                    <div className="get-carts-store-small-name"
                                    onClick={() => {
                                        setSelectedCarts(selectedCarts.map((selectedCart, index) => {
                                            if (index === ind) {
                                                return !selectedCart;
                                            }
                                            return selectedCart;
                                        }))
                                    }}
                                    >{cart.storeName}</div>
                                    <div className="get-carts-store-small-info">
                                        <div className="get-carts-store-small-info-cost-id">
                                            <div className="get-carts-store-cost">$ {cart.totalCost}</div>
                                            <div className="get-carts-store-id">id: {cart.storeId}</div>
                                        </div>
                                        <button onClick={() =>(
                                            setShowingCarts(showingCarts.map((showingCart, index) => {
                                                if (index === ind) {
                                                    return !showingCart;
                                                }
                                                return showingCart;
                                            }))
                                        )}>
                                            {   
                                                showingCarts[ind] ?
                                                <>&#x25B2;</> :
                                                <>&#x25BC;</>
                                            }
                                        </button>
                                    </div>
                                </div>
                                {
                                    showingCarts[ind] &&
                                    <div className={`get-carts-store-cart ${showingCarts[ind] ? 'active':''}`}>
                                        {
                                            cart.cart.map((item) => (
                                                <div className="get-carts-store-cart-item" key={JSON.stringify(item)}>
                                                    <div className="get-carts-store-cart-item-name">{item.item.name}</div>
                                                    <div className="get-carts-store-cart-item-cost">Cost: {item.cost}</div>
                                                    <div className="get-carts-store-cart-item-amount">Amount:{item.item.amount}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                        ))
                    }
                </div>
                <div className="get-carts-save">
                    <button 
                        className="get-carts-save-button"
                        onClick={handleSaveSelectedCartsToCookie}
                    >Save ({selectedCarts.filter((val) => val===true).length})</button>
                </div>
            </div>
        );
    }

export default GetCarts;