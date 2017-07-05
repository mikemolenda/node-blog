var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var multer = require('multer');

var db = require('monk')('localhost/node-blog');
var upload = multer({ dest: 'uploads/' });

/*
 * GET posts/add
 * Renders new post form
*/
router.get('/add', function(req, res, next) {
    // Get categories data to pass to select field
    var categories = db.get('categories');
    categories.find({}, {}, function (err, categories) {
        res.render('add-post', {
            title: 'Add a new post',
            categories: categories
        });
    });
});

/*
 * POST posts/add
 * Writes post to DB
 */
router.post('/add', upload.single('headlineImage'), function(req, res, next) {
    // Validate fields
    req.checkBody('postTitle', 'Title must not be empty').notEmpty();
    req.checkBody('postBody', 'Body must not be empty').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.render('add-post', { errors: errors });
    } else {
        // If fields valid, write post to DB
        try {
            var posts = db.get('posts');
            var postData = {};

            postData.title = req.body.postTitle;
            postData.author = req.body.postAuthor; // TODO: Get this from session user
            postData.date = new Date();
            postData.body = req.body.postBody;

            if (req.body.postCategory) {
                postData.category = req.body.postCategory;
            } else {
                postData.category = 'Uncategorized';
            }

            if (req.file) {
                postData.headlineImage = req.file.filename;
            }

            posts.insert(postData);

            req.flash('success', 'Post added');
            res.location('/');
            res.redirect('/');

        } catch(err) {
            res.send(err);
        }
    }
});


module.exports = router;
