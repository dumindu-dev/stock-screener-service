const User = require("../models/user.model");

exports.getUserSettings = async (req, res) => {
	const currentUser = await User.findOne({userId:req.auth.userId});
	let settingsResult = {
		isTelegramConnected:0,
		isDividendNotifsEnabled:0
	};

	if(currentUser.telegramChatId){
		settingsResult.isTelegramConnected=1;
	}

	if(currentUser.settings.telegram_dividends){
		settingsResult.isDividendNotifsEnabled=1;
	}

	res.send(settingsResult);
};

exports.updateDividendAlertSetting = async (req, res) => {
	let alertEnabled = req.body.isDividendAlertsEnabled;
	let user_id=req.auth.userId;

	await User.updateOne({"userId":user_id},{"$set":{"settings.telegram_dividends":alertEnabled}});

	res.send({success:1,description:"Setting updated successfully."});
};