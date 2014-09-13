
var api = require('../controllers/api');

module.exports = function(app) {
    app.get('/', api.index);

    app.get('/thread/:id/analyze-sentiment', api.analyzeSentiment);
    app.post('/thread', api.createThread);
}
