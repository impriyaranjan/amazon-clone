import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

function CheckoutProduct({ id, title, image, price, rating,hideButton }) {
	
	const [{ basket }, dispatch] = useStateValue();

	//console.log(id, title, image, price, rating ); /*anywhere you can debug your error*/

	const removeFromBasket = () => {
		//remove item from the  basket...
		dispatch({
			type: "REMOVE_FROM_BASKET",
			id: id,
		});
	}
	return (

		 /*here we have all the mapping checkoutProduct imported */
		/*image on the left and all the info we want on rightside of product */
		<div className="checkoutProduct">
			<img className="checkoutProduct__image" src={image} alt="" />

			<div className="checkoutProduct__info">
				<p className="checkoutProduct__title">{title}</p>

				<p className="checkoutProduct__price">
				   <small>₹ </small>
				   <strong>{price}</strong>
				</p>

				<div className="checkoutProduct__rating">
				{  Array(rating)
					.fill()
					.map((_, i) => (
						<p>⭐</p>
				 ))}
				</div>
				{!hideButton && (
					<button onClick={removeFromBasket}>Remove from Basket
					</button>
				)}
			</div>
		</div>
	);
}

export default CheckoutProduct;