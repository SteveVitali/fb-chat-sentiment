var app = app || {};

app.MainView = Backbone.View.extend({
    
    el: '#main-view',

    events : {
        'click .analyze-fb': 'analyzeFBMessages'
    },
    
    initialize: function(initial_data) {
        this.subviews = {};
        this.threads = [];
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
    },
    
    loadMessages: function(url) {
        var that = this;
        FB.api(url || '/me/inbox', function(response) {
            that.threads = that.threads.concat(response['data']);
            if (response['paging']) {
                console.log('Calling this shit again');
                that.loadMessages(response['paging']['next']);
            } else {
                console.log('Threads', that.threads);
            }
        });
    },

    analyzeFBMessages: function(e) {
        
    },
});
