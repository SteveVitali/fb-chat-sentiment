var app = app || {};

app.MainView = Backbone.View.extend({
    
    el: '#main-view',

    events : {
        
    },
    
    initialize: function(initial_data) {
        this.subviews = {};
        // Other stuff
        this.render();
    },
    
    render: function() {
        var source   = $('#main-view-template').html();
        var template = Handlebars.compile(source);
        var html     = template();
        this.$el.html(html);

        for (var key in this.subviews) {
            this.$el.append( this.subviews[key].render().el );
        }
    },
    
    closeSubviews: function() {
        for (var key in this.subviews) {
            this.subviews[key].close();
        }
        this.subviews = {};
        this.render();
    }
});
