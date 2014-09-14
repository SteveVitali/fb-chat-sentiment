var mongoose = require('mongoose');

var ThreadSchema = mongoose.Schema({
    facebook_id: String,
    members: [{
            id: String,
            name: String
    }],
    comments: [{
        created_time: Date,
        from: {
            id: String,
            name: String
        },
        id: String,
        message: String,
        sentiment: {
            score: Number,
            comparative: Number,
            tokens: [String],
            words: [String],
            positive: [String],
            negative: [String]
        }
    }],
    next_comments_url: String,
});

module.exports = mongoose.model('Thread', ThreadSchema);
