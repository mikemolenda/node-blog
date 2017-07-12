var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/node-blog');

/*
 * GET categories/[category]
 * Shows list of posts belonging to specified category
 */
router.get('/:category', function(req, res, next) {
    var posts = db.get('posts');

    posts.find({category: req.params.category}, {}, function(err, posts) {
        res.render('index', {
            'title': req.params.category,
            'posts': posts
        });
    });
});

module.exports = router;