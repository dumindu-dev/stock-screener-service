const axios = require("axios");
const simpleOauth2 = require('simple-oauth2');
const config = require("../config");

const COUNT_ACTIVE_USERS_ENDPOINT = "/api/stats/countActiveUsers";

async function getAccessToken(){
	const oauthConfig = {
		client: {
		  id:config.statConsumerKey, 
		  secret: config.statConsumerSecret,
		},
		auth: {
		  tokenHost: config.statTokenURL,
		  tokenPath: config.statTokenPath,
		},
	};
	const oauth2Client = new simpleOauth2.ClientCredentials(oauthConfig);
	const getToken = await oauth2Client.getToken();
	return getToken.token.access_token;
}

//async function logActiveUsers(userId) {
exports.logActiveUsers = async function(userId) {
	
	const accessToken = await getAccessToken();
	console.log(accessToken);
	  
	axios.post(config.statServiceURL+COUNT_ACTIVE_USERS_ENDPOINT,{userId:userId},{
		headers:{
			"Authorization":`Bearer ${accessToken}`
		},
		data: JSON.stringify({
				userId:userId
		})
	}).then(response=>{
		console.log("Active user update is successfull");
	}).catch(error=>{
		console.log("Error contacting the stat service: "+error);
	});
}

//logActiveUsers("awd");