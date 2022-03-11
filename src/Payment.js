import React, { useState, useEffect } from 'react';
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";  //this is used to push orders in cloud database of firebase;

function Payment() {
	
	const [{ basket, user }, dispatch] = useStateValue();
	const history = useHistory();

	//for payment method
	const stripe = useStripe();
	const elements = useElements();

	const [succeeded, setSucceeded] = useState(false);
	const [processing, setProcessing] = useState("");
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState(true);

//very important snippet for payment request!!!!!!!!!!!!!
	useEffect(() => {
		//generate the special stripe secret which allows us to charge a customer
		//and it also vary from customer2 customer and basket2basket price changes!
		
//whenever the basket changes it get request to the stripe to change accordingly;
		const getClientSecret = async () => {
			// waiting for request axios(is way of request may be push/set or anything). now create axios.js file.
			const response = await axios({
				method: 'post',
				//Stripe expects the total in a currencies subunits.1rs =100cent
				// This is the url which we used in post method of app in functions>>index.js
				url: `/payments/create?total=${getBasketTotal(basket) * 100}`
			})
			//once we build out backend;clientsecret is coming from there;
			setClientSecret(response.data.clientSecret)
		}

		getClientSecret();

	}, [basket])

	// this is to check our backend running properly or not after writing code of funtions>>index.js and axios.js then we are jumping on Payment.js;
	console.log('THE SECRET IS >>>', clientSecret);
	//used for debbing;
	/*console.log(user)*/

	//its a asynchronous function.event
	const handleSubmit = async (event) => {
		//do all the fancy stripe stuff---- for payment
		event.preventDefault();  //stop from refreshing the page
		setProcessing(true); //in the middle of payment enter key wont work;

		const payload = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement)
			}
		}).then(({ paymentIntent }) => {
			//payment intent = Payment confirmation;
			
			//we need to push our order in cloud__database!!!! sql database collection concept;
			db.collection('users')
			  .doc(user?.uid)
			  .collection('orders')
			  .doc(paymentIntent.id) //order id
			  .set({
			  	  basket: basket,
			  	  amount: paymentIntent.amount,
			  	  created: paymentIntent.created  //when the order was placed;

			  })


			setSucceeded(true);
			setError(null);
			setProcessing(false);

			//Now after completing payment your basket must be empty
			dispatch({
				type: 'EMPTY_BASKET'
			});    //Now go to reducer where you listen to the event and do some change!!

			history.replace('/orders');//after payment user must shifted to order page
	//after completing this go to cloud/backend setup!!!!!!!!!wow....
		})
	}
	//takes an event and does some changes!! ( e => {}) means.
	const handleChange = event => {
		//Listen  for changes in the CardElement
		// and Display any error as the customer types their card details;
		setDisabled(event.empty);
		setError(event.error ? event.error.message : "");
	}

	return (
		<div className="payment">
			<div className="payment__container">
				<h1>
				Checkout(<Link to="/checkout">{basket?.length} items</Link>)
				</h1>


			   {/* Payment section-delivery address*/}
			   	<div className="payment__section">
			   		<div className="payment__title">
			   		   <h3>Delivery Address</h3>
			   		</div>
			   		<div className="payment__address">
			   		  <p>{user?.email}</p>
			   		  <p>A58-59, Nawada,</p>
			   		  <p>UttamNagar, Delhi</p>
			   		</div>
			   	</div>



			    {/* Payment section-Review Items*/}
			   	<div className="payment__section">
			   	  <div className="payment__title">
			   	     <h3>Review items and Delivery</h3>
			   	  </div>
			   	  <div className="payment__items">
			   	  	 {basket.map(item => (
			   	  	 	<CheckoutProduct
			   	  	 		id={item.id}
			   	  	 		title={item.title}
			   	  	 		image={item.image}
			   	  	 		price={item.price}
			   	  	 		rating={item.rating}
			   	  	 	/>
			   	  	 ))}
			   	  </div>
			   	</div>



			   {/* Payment section-Payment Method*/}
			   	<div className="payment__section">
			   	    <div className="payment__title">
			   	       <h3>Payment Method</h3>
			   	    </div>
			   	    <div className="payment__details">
			   	    	{/* Stripe magic will go (important)*/}

			   	    	<form onSubmit={handleSubmit}>
				   	    	<CardElement onChange={handleChange}/>

				   	    	<div className="payment__priceContainer">
					   	    	<CurrencyFormat
					   	    		renderText={(value) =>(
					   	    		    <h3>Order Total: {value}</h3>
					   	    		)}
					   	    	  decimalScale={2}
					   	    	  value={getBasketTotal(basket)}
					   	    	  displayType={"text"}
					   	    	  thousandSeparator={true}
					   	    	  prefix={'₹ '}
					   	    	/>
					   	    	<button disabled={processing || disabled || succeeded}>
					   	    		<span>{processing ? <p>Processing</p> : "Buy Now"}</span>
					   	    	</button>

				   	    	</div>

				   	    		{/* Errors */}
				   	    		{error && <div>{error}</div> }
			   	    	</form>
			   	    </div>
			   	</div>



			</div>
		</div>
	);
}

export default Payment;