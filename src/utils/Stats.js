const axios = require("axios");
const simpleOauth2 = require('simple-oauth2');
const config = require("../config");

const COUNT_ACTIVE_USERS_ENDPOINT = "/api/stats/countActiveUsers";
const GET_ACTIVE_USERS_ENDPOINT = "/api/stats/getActiveUserCount";

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

exports.getActiveUserCount = async function() {
	
	const accessToken = await getAccessToken();
	console.log(accessToken);
	  
	return axios.post(config.statServiceURL+GET_ACTIVE_USERS_ENDPOINT,{},{
		headers:{
			"Authorization":`Bearer ${accessToken}`
		}
	});
}
