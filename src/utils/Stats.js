const axios = require("axios");
const simpleOauth2 = require('simple-oauth2');
const config = require("../config");

const COUNT_ACTIVE_USERS_ENDPOINT = "/api/stats/countActiveUsers";

exports.logActiveUsers = async function (userId) {
	const authConfig = {
		client: {
		  id:config.statConsumerKey, 
		  secret: config.statConsumerSecret,
		},
		auth: {
		  tokenHost: config.statTokenURL,
		  tokenPath: config.statTokenPath,
		},
	};
	const oauth2Client = new simpleOauth2.ClientCredentials(authConfig);
	const getToken = await oauth2Client.getToken();
	const accessToken = getToken.token.access_token;

	axios.post(config.statServiceURL+COUNT_ACTIVE_USERS_ENDPOINT, {
		headers: {
		  'Authorization': `Bearer ${accessToken}`
		},
		data:JSON.stringify({
			"userId":userId
		})
	}).then(response =>{
		console.log("Log event logged successfully.");
	}).catch(error=>{
		console.log("Error occured calling stat service."+error);
	});

}