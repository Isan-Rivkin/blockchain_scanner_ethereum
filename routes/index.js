var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/cookie', function(req, res, next) {
        // read cookies
        if(req.cookies  == undefined){
            let options = {
                maxAge: 1000 * 60 * 60 * 24 * 30, // would expire after 1 month
                httpOnly: false, // The cookie only accessible by the web server
            }
            // Set cookie
            res.cookie('cookieName', 'cookieValue', options) // options is optional
            res.send('');
        }
        console.log(req.cookies)
});
module.exports = router;
