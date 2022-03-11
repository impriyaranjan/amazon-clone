// Set Up data Layer;
// we need to track the user info and basket at diff. pages;
// Basically creating Global Variable that can be passed around in a React App. 
// instead of passing props from grandparent to parent to child, and so on;

import React, { createContext, useContext, useReducer } from "react";

//This is the DataLayer
export const StateContext = createContext();


//BUILD A PROVIDER
export const StateProvider = ({ reducer, initialState, children}) => (
	<StateContext.Provider value = {useReducer(reducer, initialState)} >
	{children}
	</StateContext.Provider>
);


export const useStateValue = () => useContext(StateContext);























