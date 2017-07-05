var express = require('express');
var router = express.Router();

/* GET posts/add */
router.get('/add', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
