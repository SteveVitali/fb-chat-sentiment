var spinner;

var app = app || {};

$(function() {
    app.App    = new app.MainView();
    app.Router = new app.MainRouter();
    Backbone.history.start({ root: '/'});
});
