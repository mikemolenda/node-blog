var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var moment = require('moment');

var db = require('monk')('localhost/node-blog');

/* GET home page. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var posts = db.get('posts');

    var categories;
    var archives =[];

    // Get categories
    posts.distinct('category', function(err, posts) {
        categories = posts;
    });

    // Get archive dates
    posts.aggregate([
        {'$project': {
            'year': { '$year': '$date' },
            'month': { '$month': '$date' }
        }},
        {'$group': {
            '_id': null,
            'distinctDates': { '$addToSet': { 'year': '$year', 'month': '$month' } }
        }}
    ], function(err, posts) {
        archiveDates = posts[0].distinctDates;

        for (var i = 0; i < archiveDates.length; i++) {
            var month = moment.monthsShort(archiveDates[i].month - 1);
            archives.push(month + ' ' + archiveDates[i].year);
        }
    });

    // Get posts and render page
    posts.find({}, {}, function(err, posts) {
        res.render('index', {
            title: 'Blog',
            posts: posts.reverse(),
            categories: categories,
            archives: archives
        });
    });
});

module.exports = router;
