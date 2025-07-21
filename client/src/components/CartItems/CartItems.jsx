import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext';
import remove_icon from "../Assets/cart_cross_icon.png"
import "./CartItems.css"
import { loadStripe } from '@stripe/stripe-js';

export default function CartItems() {

    // Replace with your local backend URL
    const BASE_URL = "http://localhost:5000";

    const { getTotalcartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

    const makepayment = async () => {
        const stripe = await loadStripe('pk_test_51Pt1NCGwu7WfDqJU4OlQm0xrOJf6W63Ccg20CjPUZe7xKkISIHmL6RMvneFf3rCl31roSBf1gUJdzgqO4iJIJq9T00KcqVqEXY');

        console.log("stripe funct");

        const body = {
            product: 84.03 * getTotalcartAmount()
        }
        console.log(body);

        const headers = {
            "Content-Type": "application/json"
        }

        const response = await fetch(`${BASE_URL}/payment`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });

        const session = await response.json();

        const result = stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            console.log(result.error);
        }
    }

    return (
        <div className='cartitems'>
            <div className="cartitem-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (e && cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format cartitem-format-main">
                                <img
                                    src={`${BASE_URL}/images/${e.image}`}
                                    className='carticon-produt-icon'
                                    alt=""
                                />
                                <p>{e.name}</p>
                                <p>${e.new_prices}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>${e.new_prices * cartItems[e.id]}</p>
                                <img
                                    className='cartitems-remove-icon'
                                    src={remove_icon}
                                    onClick={() => removeFromCart(e.id)}
                                    alt=""
                                />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalcartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalcartAmount()}</h3>
                        </div>
                    </div>
                    {getTotalcartAmount() > 0 && (
                        <button onClick={makepayment}>PROCEED TO CHECKOUT</button>
                    )}
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, enter it here</p>
                    <div className='cartitems-promobox'>
                        <input type="text" placeholder='promo code' />
                        {getTotalcartAmount() > 0 && (
                            <button onClick={makepayment}>Submit</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
