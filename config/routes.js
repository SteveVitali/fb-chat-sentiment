
var api = require('../controllers/api');

module.exports = function(app) {
    app.get('/', api.index);
}
