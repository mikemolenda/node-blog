var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/node-blog');

/*
 * GET archives/[archiveDate]
 * Shows list of posts from a specific month and year
 */
router.get('/:archiveDate', function(req, res, next) {
    var posts = db.get('posts');

    // TODO: convert archiveDate to form that can be queried (SEE: http://bit.ly/2ufzbPk)
    // TODO: Or add archiveDate property to posts on creation?
    var lookupDate = request.params.archiveDate;


    posts.find({date: lookupDate}, {}, function(err, posts) {
        res.render('index', {
            'title': req.params.archiveDate,
            'posts': posts
        });
    });
});

module.exports = router;
