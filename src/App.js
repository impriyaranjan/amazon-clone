import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router,Switch,Route,} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";


const promise = loadStripe(
"pk_test_51HdjKFAM8lZMlaCYe9vPWWgwt79jxH15bAR9D6r6jI9MbFBrToXC4BFOc440jDaIrM7Qy5R95gB0VBDoXERNgzlC00aJglXhgS"
);

function App() {

  const [{}, dispatch] = useStateValue();
 
  useEffect(() => {
  
      //it will only run once when the app component loads..
      auth.onAuthStateChanged(authUser => {
        console.log('THE USER IS >>> ', authUser);

        if(authUser){
          // setting user/prev user with firebase;
          //user just logged in/ was logged in even you refresh the page;
          dispatch({
            type: 'SET_USER',
            user: authUser,
          });
        }else {
          
          // the user is logged out;        
          dispatch({
            type: 'SET_USER',
            user: null,
          });
        }
    });
    
  }, []);



  return (
    <Router>
    <div className="App">
      <Switch>

        <Route path="/checkout">
          <Header/>
          <Checkout/>
        </Route>

        <Route path="/orders">
          <Header/>
          <Orders/>
        </Route>

        <Route path="/login">
          <Login/>
        </Route>

        <Route path="/payment">
          <Header/>
          <Elements stripe={promise}>
            <Payment/>
          </Elements>
        </Route>

        { /*this is the default route, */}
        <Route path="/">
          <Header/>
          <Home/>
        </Route>

      </Switch>
    </div>
    </Router>
  );
}

export default App;
