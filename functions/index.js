const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const express =require("express");
const cors = require("cors");
//copy paste your secret key from stripe API in the box;
//setup API;
const stripe = require("stripe")('sk_test_51HdjKFAM8lZMlaCYTT3N7aegQ4rR1NoVkmPc97MUGWgF9VQDbckSVwWNaxQ8d6mcmDB9WejP2Xgm3zxxUc5WeaLb003Vi17PI8');

//--APP config:
const app = express();

//--Middlewares, cors is for security purpose
app.use(cors({ origin: true }));
app.use(express.json());      //this allow us to send data in json format;

//--API Routes
/*set-up Dummy routes; this is how api works (request & response)*/
//http://localhost:5001/clone-d766c/us-central1/api
app.get('/', (request, response) => response.status(200).send('Hello World'));

app.post('/payments/create', async (request, response) => {
	const total= request.query.total;

	/*console.log("Payment Request Received BOOM!! for this amount >>>", total);*/

	const paymentIntent = await stripe.paymentIntents.create({
		amount: total,    //subunits of the currency;
		currency: "inr",
	});

	//Ok...everything is good & its created something (201);
	response.status(201).send({
		clientSecret: paymentIntent.client_secret,
	});
});


/*

//now go to same url and use /Priyaranjan : your msg will be printed!!!
//http://localhost:5001/clone-d766c/us-central1/api/Priyaranjan
app.get('/Priyaranjan',(request, response) => response.status(200).send('Watsup Priyaranjan'))

*/


//--Listen command
exports.api = functions.https.onRequest(app);


//this is example running api  on below link open it on chrome you will see "hello world";
//http://localhost:5001/clone-d766c/us-central1/api