var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup',isNotLoggedIn,function(req,res,next){
  res.render('user/signup');
});

router.get('/signin',isNotLoggedIn,function(req,res,next){
  res.render('user/signin');
});

router.post('/signup',isNotLoggedIn,passport.authenticate('local.signup'),function(req,res,next){
  res.redirect('/');
});

router.post('/signin',isNotLoggedIn,passport.authenticate('local.login'),function(req,res,next){
  res.redirect('/');
});

router.get('/logout',isLoggedIn,function(req,res,next){
  req.logout();
  res.redirect('/');
});







module.exports = router;

function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
      return next();
    else
      res.redirect('/');
}

function isNotLoggedIn(req,res,next){
    if(!req.isAuthenticated())
      return next();
    else
      res.redirect('/');
}