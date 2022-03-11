import React from 'react';
import Product from "./Product";
import './Home.css';

function Home() {
   return (
	<div className="home">
		<img  
		className="home__image"
		src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" 
		alt=""
		/>

		{/* Product1 id, title, price, rating, image*/}
	  <div className="home__row">
		<Product 
		  id="12345"
		  title="The Learn Startup: How Constant Innovation Creates Radically Successful Business Paperback"
		  price={300.00}
		  rating={5}
		  image="https://m.media-amazon.com/images/I/81jgCiNJPUL._AC_UY327_FMwebp_QL65_.jpg"
		/>
		{/* Product2 id, title, price, rating, image*/}
		{/* Product3 id, title, price, rating, image and so on*/}
		<Product
		  id="12346"
		  title="Canon Pixma G3000 All-in-One Wireless Ink Tank Colour Printer"
		  price={12499.00}
		  rating={4}
		  image="https://images-na.ssl-images-amazon.com/images/I/31KlTzM3%2BAL.jpg"
		/>
	  </div> 

	  <div className="home__row">
		<Product
		  id="12347"
		  title="HONOR Magic Watch 2 (46mm, Charcoal Black) 14-Days Battery, SpO2, BT Calling & Music Playback, AMOLED Touch Screen, Personalized Watch Faces, 15 Workout Modes, Sleep & HR Monitor, Smart Assistant"
		  price={9999.00}
		  rating={4}
		  image="https://images-na.ssl-images-amazon.com/images/I/81nzfMLOgaL._SL1500_.jpg"
		/>

		<Product
		  id="12348"
		  title="Samsung Galaxy Tab A 10.1 (10.1 inch, RAM 2GB, ROM 32GB, Wi-Fi-Only), Black"
		  price={13999.00}
		  rating={3}
		  image="https://images-na.ssl-images-amazon.com/images/I/71PWPoS%2BNtL._SL1500_.jpg"
		/>
		<Product
		  id="12349"
		  title="Netgear Orbi AC3000 Tri-Band Wi-Fi System Router (White)"
		  price={23499.00}
		  rating={4}
		  image="https://images-na.ssl-images-amazon.com/images/I/51lyBB5yN6L._SL1200_.jpg"
		/>
	  </div>

	  <div className="home__row">
	  <Product
		  id="12350"
		  title="Panasonic 215 cm (85 inches) Full HD Android Smart LED TV TH-40HS450DX (Black) (2020 Model)"
		  price={19990.00}
		  rating={4}
		  image="https://images-na.ssl-images-amazon.com/images/I/71el-PAu1IL._SL1500_.jpg"
		/>
	  </div>

   {/*4th row on home page!!*/}
   	  <div className="home__row">
   	  <Product
   		  id="12351"
   		  title="Fitkit FT100S Series 1.75HP (3.25HP Peak) Motorized Treadmill With Free at Home Installation Services and Free Diet & Fitness Plan"
   		  price={23999.00}
   		  rating={3}
   		  image="https://images-na.ssl-images-amazon.com/images/I/613wi6OmlwL._SL1100_.jpg"
   		/>
   		<Product
   		  id="12352"
   		  title="AmazonBasics 6 kg Fully-Automatic Front Load Washing Machine (Grey/Silver, In-built Heater, Self cleaning technology)"
   		  price={13999.00}
   		  rating={5}
   		  image="https://images-na.ssl-images-amazon.com/images/I/81X52AI2ovL._SL1500_.jpg"
   		/>
   		<Product
   		  id="12353"
   		  title="Bosch Aquatak 125 1.5-Watt High Pressure Washer (Green)"
   		  price={9499.00}
   		  rating={4}
   		  image="https://images-na.ssl-images-amazon.com/images/I/717wYrO%2Bb0L._SL1500_.jpg"
   		/>
   	  </div>
	</div>
	);
}

export default Home;