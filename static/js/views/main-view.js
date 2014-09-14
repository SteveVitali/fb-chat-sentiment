var app = app || {};

app.MainView = Backbone.View.extend({
    
    el: '#main-view',

    events : {
        'click .analyze-fb': 'analyzeFBMessages'
    },
    
    initialize: function() {
        this.subviews = {};
        this.threads = { data: []};
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

    loadThreads: function(url) {
        var that = this;
        FB.api(url || '/me/inbox', function(response) {
            console.log('welp', response);
            that.threads.data = that.threads.data.concat(response['data']);
            if (response['paging']) {
                console.log('Calling this shit again; just kidding');
                //that.loadThreads(response['paging']['next']);
                that.displayThreads();
            } else {
                that.displayThreads();
            }
        });
    },
    
    displayThreads: function() {
        var that = this;
        _.each(this.threads.data, function(thread) {
            // Omit conversations with more than 2 people for now
            if (thread.to.data.length <= 2) {
                var thread_choice = new app.ThreadChoiceView(thread, that);
                that.$('.thread-list').append( thread_choice.render().el );
            }
        });
    },

    analyzeThread: function(thread) {
        var that = this;
        console.log('begin analysis of', thread);
        $.ajax({
            type : 'POST',
            url: '/thread',
            data: { thread: thread },
            dataType: 'json',
            success: function(new_thread) {
                console.log('Created or updated existing thread in Mongo', new_thread);
                console.log('Now going to analyze dat sentiment');
                $.get('/thread/'+new_thread._id+'/analyze-sentiment', function(analysis) {
                    console.log('Got some analysis and cached it in the DB', analysis);
                    var sentiment_view = new app.SentimentAnalysisView(analysis, that);
                    that.$el.html(sentiment_view.render().el);
                    sentiment_view.drawGraph();
                });
            }
        });
    }
});
