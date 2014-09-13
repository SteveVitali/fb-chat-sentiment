module.exports = function(mongoose) {
    
    var MONGOHQ_URI = 'mongodb://stevevitali:Home=2149@ds035750.mongolab.com:35750/pennapps-2014-s';

    mongoose.connect(MONGOHQ_URI);

    mongoose.connection.on('connected', function () {
        console.log('Connected with Mongoose');
    });

    mongoose.connection.on('error',function (err) {
        console.log('Mongoose default connection error: ' + err);
    });

    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });
}
