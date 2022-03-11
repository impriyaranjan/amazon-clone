import React, { useState, useEffect } from 'react';
import "./Orders.css";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider"; //for user state;
import Order from "./Order";


function Orders() {
	//bring placed orders from your cloud database!!
	const [{ basket, user }, dispatch] = useStateValue();
	const [orders, setOrders] = useState([]);

	useEffect(() =>{
	  if(user){
		db.collection('users')  //here you are accessing user collection from your cloud db;
		  .doc(user?.uid)
		  .collection('orders')
		  .orderBy('created', 'desc')
		  .onSnapshot( snapshot => (    //This gives us realtime snapshot of our database; means if we add or remove item from db it will update at realtime;
		  	 setOrders(snapshot.docs.map(doc => ({
		  	 	   id: doc.id,
		  	 	   data: doc.data()
		  	 })))
		  ))
	  }	else {
	  		setOrders([])
	  }

	},[user])  //empty bracket is important!!

	return (
		<div className="orders">
			{/*<h1>Payment Successful!! Your order accepted</h1>*/}
			<h1>Your Order</h1>
			<div className="orders__order">
				{orders?.map(order => (
					<Order order={order}/>
				))}
			</div>
		</div>
	);
}

export default Orders;