exports.getRandomInt = function (min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

exports.isNumeric = function (num){
	num = "" + num;
	return !isNaN(num) && !isNaN(parseFloat(num));
}