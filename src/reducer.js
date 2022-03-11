//its an object and it has basket;

export const initialState = {
	basket: [],
	user: null,
};

//to get sum of prime of tatal items in basket as its value;(selector)
export const getBasketTotal = (basket) =>
 basket?.reduce((amount, item) => item.price +amount, 0)

//we manupulate state by our action like add/remove item to the basket;

const reducer = (state, action) => {

	console.log(action);
	switch (action.type) {
		case "ADD_TO_BASKET":
		   //Logic for adding item to basket
		   return {
		   	...state,  //whatever the state return it;
		   	basket: [...state.basket, action.item],
		   };

		//After payment successful: your basket must be empty array; now go create order.js in App.js where you redirect after successful payment!!
		case 'EMPTY_BASKET':
			return {
				...state,
				basket: []
			};

		case "REMOVE_FROM_BASKET":
		   //Logic for Removing item from basket
		   //we cloned the basket
		   let newBasket = [...state.basket];

		   //we check to see if product exists then splice/remove that index and reduce size of array by 1;
		   const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);

		   if(index>= 0) {
		   	//item exists in basket and remove it...
		   	 newBasket.splice(index, 1);
		   }else {
		   	 console.warn(
		   	 	`cant remove product (id: ${action.id}) as its not in the Basket!`
	   	 	);
		   }
		   return {...state, basket: newBasket };
		 
		 case "SET_USER":
		 	return{
		 		...state,
		 		user: action.user
		 	}

		default:
			return state;
	}
};


export default reducer;












