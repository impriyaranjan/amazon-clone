// need to install axios....needed for payment purpose(vey important fetching library for request/get)
// >>npm i axios

import axios from "axios";

const instance = axios.create({
	
	//our back-end and amazon-clone app were running on different ports, so we need to set base url 
	// same as our back-end url which was provided by firebase: express api during backend work;
	/*   baseURL: '...'     //THE API (cloud Function ) URL ,for testing purpose of backend */

	baseURL: 'http://localhost:5001/clone-d766c/us-central1/api'

});

export default instance;




//Here we are prefering axios over (js fetch API) bcz it is easier and gives easy way
//... to add base URL. ANd it is so widely used in professional environment!!!!!














