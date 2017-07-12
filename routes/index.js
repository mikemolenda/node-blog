var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var moment = require('moment');

var db = require('monk')('localhost/node-blog');

/* GET home page. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var posts = db.get('posts');

    // Get posts and render page
    posts.find({}, {}, function(err, posts) {
        // Get categories
        var uniqueCat = {};
        var categories = posts
            .map(function(post) {
                return post.category;
            })
            .filter(function(category) {
                return uniqueCat.hasOwnProperty(category) ? false : (uniqueCat[category] = true);
            });

        // Get archive dates
        var uniqueMonth = {};
        var archiveDates = {};
        posts
            .map(function(post) {
                return post.date;
            })
            .sort(function(a, b) {
                return moment(b).diff(moment(a));
            })
            .filter(function(date) {
                var year = moment(date).format('YYYY');
                var month = moment(date).format('MMMM YYYY');

                if (!archiveDates[year]) {
                    archiveDates[year] = [];
                }

                if (!uniqueMonth.hasOwnProperty(month)) {
                    uniqueMonth[month] = true;
                    archiveDates[year].push(month);
                }
            });

        var archiveYears = Object.keys(archiveDates).sort().reverse();

        // Render response
        posts.reverse();
        res.render('index', {
            title: 'Recent Posts',
            posts: posts,
            categories: categories,
            archiveDates: archiveDates,
            archiveYears: archiveYears
        });
    });
});

module.exports = router;
