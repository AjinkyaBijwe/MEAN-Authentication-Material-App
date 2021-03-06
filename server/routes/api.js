var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user.js');


router.post('/register', function(req, res) {
  User.register(new User({name:req.body.name, email:req.body.email, username: req.body.username, data: req.body.data}),
    req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!'
      });
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

router.get('/blogData', function (req, res) {
  var fs = require('fs');
  var obj;
  fs.readFile('server/data/blog.json', 'utf8', function (err, data) {
    if(err){
      return res.status(200).json({
        blogData: err
      });
    }else{
       return res.status(200).json({
         blogData : JSON.parse(data)
      });
    }
  });
});

router.get('/status', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
  });
});

router.post('/data', function(req,res){
 User.find({username : req.body.username},'-_id data email name username', function(err, doc) {
    if (err) {
             res.status(500).json({
              data : err
            });
             callback(err);
        } else {
            res.status(200).json({
              data : doc
            });
        }
    });
});

module.exports = router;