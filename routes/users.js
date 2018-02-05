/**
 * Created by Tomer on 03/02/2018.
 */
'use strict';
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('Test', ['users']); //local mongo installation, DB is mydb

// Get All Tasks
router.get('/users', function(req, res, next){
    db.users.find(function(err, users){
        if(err){
            res.send(err);
        }
        res.json(users);
    });
});



module.exports = router;