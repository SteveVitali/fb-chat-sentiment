
exports.index = function(req, res) {
	res.render('index', {});
}

exports.analyzeSentiment = function(req, res) {
	console.log('analyzing sentiment of', req.body);
}