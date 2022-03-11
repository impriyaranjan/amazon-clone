import React from "react";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";


//import variable basket value;
import { useStateValue } from "./StateProvider";

function Checkout() {
	//whenever you want manipulation then you also need to pull dispatch;
	const [{ basket, user }, dispatch] = useStateValue();

	return (
		<div className="checkout">
		  <div className="checkout__left">
			<img 
			className="checkout__ad" 
			src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/CEPC/Jupiter/Headers/P1/xcm_banners_02_cepc-v5_1500x300_in-en.jpg" 
			alt="" 
			/>
			{/*if your basket length is empty show me this stuff:*/}
			{basket?.length === 0 ? (
				<div>
					<h3>Hello,{user?.email}</h3>
					<h2>Your Shopping Basket is empty</h2>
					<p>
					  You have no item in your basket. TO buy one or more items,
					   click "Add to basket" next to the item
					</p>
				</div>
			) : (
				<div>
				    <h3>Hello,{user?.email}</h3>
					<h2 className="checkout__title">Your shopping basket</h2>

				{/* List out of all of the Checkout Products */}
				{basket?.map((item) => (
				<CheckoutProduct
					id={item.id}
					title={item.title}
					image={item.image}
					price={item.price}
					rating={item.rating}
				/>
				))}
				</div>
			)}
		  </div>
		  {basket.length > 0 && (
		  	 <div className="checkout__right">
		  	 	<Subtotal />
		  	 </div>
	  	   )}
		</div>
	);
}

export default Checkout;