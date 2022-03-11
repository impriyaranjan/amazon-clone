import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
	//it uses your browser history and if valid then automatically sign to amazon hoge page!!
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const signIn = e => {
		//prevent from refreshing the page
		e.preventDefault();

		//some fancy firebase login shitt....verification and authentic email and password checkup;
		auth.signInWithEmailAndPassword(email, password)
			.then(auth =>{
				history.push('/')
			})
			.catch(error => alert(error.message))
	}

	const register = e=> {
		e.preventDefault();

		// do some fancy firebase register shitt......
		auth.createUserWithEmailAndPassword(email,password)
			.then((auth) => {
				//it successfully created new user with email 
				//and password.
				{/*console.log(auth); */}
				if (auth) {
					history.push('/')
				}
			})
			.catch(error => alert(error.message))
	}

	return (
	  <div className="login">		
	    <Link to='/'>
		    <img className="login__logo"
			    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" 
		       alt=""/>
	    </Link>

	    <div className="login__container">
	    	<h1>Sign-in</h1>

	    	<form>
	    		<h5>E-mail</h5>
	    		<input type="text" value={email} onChange=
	    		{e => setEmail(e.target.value)} />

	    		<h5>Password</h5>
	    		<input type="password" value={password} onChange=
	    		{e => setPassword(e.target.value)} />


	    		<button type="submit" onClick={signIn}
	    		className="login__signInButton">Sign In</button>
	    	</form>
	    		<p>	
	    			By signing-in you agree to Amazon's
	    			Conditions of use & Sale. Please
	    			see our Privacy Notice, our Cookies Notice
	    			and our Interest-Based Ads
	    			Notice
	    		</p>

	    		<button onClick={register}
	    		className="login__registerButton">Create your amazon account</button>	
	    </div>

	  </div>
	);
}

export default Login;