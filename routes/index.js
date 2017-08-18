var express = require('express');
var passport = require('passport');
var router = express.Router();
var Task = require('../models/task');

/* GET home page. */
router.get('/', function(req, res, next) {
 Task.find(function(err,docs){
       if(err) res.render('index',{tasks:null});
       else
       res.render('index',{tasks:docs});
 });
 
});

router.get('/add/',isLoggedIn,function(req,res,next){
      res.render('add');
});

router.get('/update/:id',isLoggedIn,function(req,res,next){
      res.render('update',{id:req.params.id});
});

router.post('/add/',isLoggedIn,function(req,res,next){
   var task = new Task();
   task.title = req.body.title;
   task.description = req.body.description;
   task.save(function(err){
         if(err) throw err;
         else
         {
         console.log('saved');
           res.redirect('/');}
   });


});

router.post('/update/:id',isLoggedIn,function(req,res,next){
      Task.findById(req.params.id,function(err,docs){
            if(err) throw err;
            docs.title = req.body.title;
            docs.description= req.body.description;
            docs.save();
            res.redirect('/');
      });
});
  
  router.get('/delete/:id',isLoggedIn,function(req,res,next){
        var id = req.params.id;
        Task.findOneAndRemove({_id:id},function(err,offer){
              res.redirect('/');
        });
  });
module.exports = router;

function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
      return next();
    else{
      
      res.redirect('/');
}}

function isNotLoggedIn(req,res,next){
    if(!req.isAuthenticated())
      return next();
    else
      res.redirect('/');
}

