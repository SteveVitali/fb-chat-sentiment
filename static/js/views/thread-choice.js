var app = app || {};

app.ThreadChoiceView = Backbone.View.extend({
    
    tagName : 'div',
        
    events : {
        'click .analyze-button': 'analyzeThread'
    },
    
    initialize : function(model, parentView) {
        this.model = model;
        this.parentView = parentView;
        return this;
    },
    
    render: function () {
        var source   = $('#thread-choice').html();
        var template = Handlebars.compile(source);
        var html     = template(this.model);
        this.$el.html(html);
        return this;
    },

    analyzeThread: function(e) {
        console.log('Analyze thread motherfucker', model);
        this.parentView.analyzeThread(model);
    }
});
