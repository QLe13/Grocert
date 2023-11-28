import React from "react";
import "./GetCarts.css";
import { useState } from "react";


  

const GetCarts = (props) => {
    const carts = props.calculateCarts;

    const [showingCarts, setShowingCarts] = useState(carts.map((cart) => false));

    return (
            <div className="get-carts-wrapper">
                <div className="get-carts-header">
                    <div className="get-carts-title">Availability</div>
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
                            <div className="get-carts-store">
                                <div className="get-carts-store-small">
                                    <div className="get-carts-store-small-name">{cart.storeName}</div>
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
                                                <div className="get-carts-store-cart-item">
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
                <div className="get-carts-save"></div>
            </div>
        );
    }

export default GetCarts;