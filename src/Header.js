import React from 'react';
import "./Header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
//import variable basket value;
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {

	//dispatch is like shoot in/out items from the basket;
	const [{ basket, user }, dispatch] = useStateValue();
	//console.log(basket);
	const handleAuthentication = () => {
		if(user) {
			auth.signOut();
		}
	}

	return ( <nav className="header">

{/* logo on the left -> amazonlogo img*/}

	<Link to="/">
	<img className="header__logo" 
	src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt=""/>
	</Link>

{/* Search Box*/}

	<div className="header__search">
	<input type="text" className="header__searchInput"/>
	<SearchIcon className="header__searchIcon" />
	</div>

{/* 3 Links(sign in,orders, Prime)*/}

  <div className="header__nav">

	 {/* 1st Link*/}
	 <Link to={!user && '/login'} className="header__link"> 
	 	   <div onClick={handleAuthentication} className="header__option">
	      {/*user?.email || "Guest"*/}
	 	<span className="header__optionLineOne">Hello {!user ? "Guest" :
	       user.email}</span>
	 	<span className="header__optionLineTwo">{user ? 'Sign Out': 'Sign In'}</span>
	   </div>
	 </Link>

	 {/* 2nd Link */}
	 <Link to="/orders" className="header__link">
	   <div className="header__option">
	 	<span className="header__optionLineOne">Returns</span>
	 	<span className="header__optionLineTwo">& Orders</span>
	   </div>
	 </Link>	

	 {/* 3rd Link */}
	 <Link to="/" className="header__link">
	   <div className="header__option">
	 	<span className="header__optionLineOne">Your</span>
	 	<span className="header__optionLineTwo">Prime</span>
	   </div>
	 </Link>	

	 {/* 4th Link */}
	 <Link to="/checkout" className="header__link">
	 	<div className="header__optionBasket">

	 	{/* Shopping basket icon */}
	    <ShoppingBasketIcon/>

	 	{/* Number of items in the basket */}
	 	<span className="header__optionLineTwo header__BasketCount">
	 	{basket?.length}
	 	</span>

	 	</div>
	 </Link>
	
  </div>

	{/* Basket icon with number */}
 </nav>
  );
}

export default Header;  