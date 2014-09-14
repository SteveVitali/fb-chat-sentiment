var https     = require('https'),
	_ 	      = require('underscore'),
	sentiment = require('sentiment'),
	models    = require('../models/index');

exports.index = function(req, res) {
	res.render('index', {});
}

function recursiveLoadThreadComments(thread, callback) {
	if (thread.comments.paging.next) {
		https.get(thread.comments.paging.next, function(res) {
			console.log("statusCode: ", res.statusCode);
			console.log("headers: ", res.headers);
			var buffer = '';
			res.on('data', function(d) {
	    		buffer += d;
	  		});
	  		res.on('end', function() {
	  			var comments = JSON.parse(buffer);
	  			thread.comments.data = thread.comments.data.concat(comments.data);
	  			thread.comments.paging.next = (comments.paging ? comments.paging.next : undefined);
	  			recursiveLoadThreadComments(thread, callback);
	  		});
		}).on('error', function() {
			console.error(e);
		});
	} else {
		console.log('Callback getting run: total length is now', thread.comments.data.length);
		callback(thread);
	}
}

exports.createThread = function(req, res) {
	console.log('Creating thread:\n', req.body);
	var thread = req.body.thread;
	models.Thread.findOne({ facebook_id: thread.id }, function(err, thread_doc) {
		if (err) { return console.log(err); }
		if (thread_doc) {
			console.log('THREAD ALREADY EXISTS: Thread with members', _.pluck(thread_doc.members, 'name'));
			res.send(thread_doc);
		} else {
			recursiveLoadThreadComments(thread, function(thread) {
				var new_thread = new models.Thread({
					facebook_id: thread.id,
					members: thread.to.data,
					comments: thread.comments.data,
					next_comments_url: thread.comments.paging.next || undefined,
				});
				new_thread.save(function(err, new_thread) {
					if (err) { return console.log(err); }
					console.log('THREAD CREATED: members are:', _.pluck(new_thread.members, 'name'));
					res.send(new_thread);
				});
			});
		}
	});
}

exports.analyzeSentiment = function(req, res) {
	console.log('analyzing sentiment of thread with _id', req.params.id);
	models.Thread.findOne({ _id: req.params.id }, function(err, thread) {
		if (err) { return console.log(err); }
		if (thread) {
			console.log('Analyzing sentiment for thread with members', _.pluck(thread.members, 'name'));
			_.each(thread.comments, function(comment) {
				if (comment) {
					comment.sentiment = sentiment(comment.message);
				}
			});
			thread.save(function(err, thread) {
				if (err) { return console.log(err); }
				res.send({ thread: thread });
			});
		} else {
			res.send('Thread does not exist in DB');
		}
	});
}
