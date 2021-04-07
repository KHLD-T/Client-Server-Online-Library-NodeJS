var express = require('express');
var path = require('path');
var fs = require('fs');
var session = require('express-session');
const { json } = require('express');
const { render } = require('ejs');
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const { prototype } = require('stream');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // all html files in views folder
app.set('view engine', 'ejs'); // handle as ejs file not html

app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(express.static(path.join(__dirname, 'public'))); // any static file to public folder
app.use(session({secret:'secret_key',resave:false,saveUninitialized:false}));

app.get('/',function(req,res){
  res.render('login',{error:""});
});

app.get('/registration', function(req,res){
  res.render('registration',{error:""});
});
app.get('/home',function(req,res){
  res.render('login',{error:"Cannot access home page without logging in"})
});
app.get('/novel',function(req,res){
  if(req.session.key!=undefined)
    res.render('novel');
  else
    res.redirect('/');
});
app.get('/poetry',function(req,res){
if(req.session.key!=undefined)
  res.render('poetry');
else
  res.redirect('/');
});
app.get('/fiction',function(req,res){
if(req.session.key!=undefined)
  res.render('fiction');
else
  res.redirect('/');
});
app.post('/novel',function(req,res){
  if(req.session.key!= undefined)
    res.render('novel');
  else
    res.redirect('/');
});
app.post('/poetry',function(req,res){
  if(req.session.key!= undefined)
    res.render('poetry');
  else
    res.redirect('/');
});
app.post('/fiction',function(req,res){
  if(req.session.key!= undefined)
    res.render('fiction');
  else
    res.redirect('/');
});
////////////////////////////////////////////////////////////////////
app.get('/flies',function(req,res){
if(req.session.key!=undefined)
  res.render('flies',{error:""});
else
  res.redirect('/');
});
app.get('/dune',function(req,res){
if(req.session.key!=undefined)
  res.render('dune',{error:""});
else
  res.redirect('/');
});
app.get('/grapes',function(req,res){
  if(req.session.key!=undefined)
    res.render('grapes',{error:""});
  else
    res.redirect('/');
});
app.get('/leaves',function(req,res){
if(req.session.key!=undefined)
  res.render('leaves',{error:""});
else
  res.redirect('/');
});
app.get('/mockingbird',function(req,res){
if(req.session.key!=undefined)
  res.render('mockingbird',{error:""});
else
  res.redirect('/');
});
app.get('/sun',function(req,res){
if(req.session.key!=undefined)
  res.render('sun',{error:""});
else
  res.redirect('/');
});
app.get('/search',function(req,res){
  if(req.session.key!=undefined)
    res.render('searchresults');
  else
    res.redirect('/');
  });
app.post('/flies',function(req,res){
  if(req.session.key== undefined)

  {
    res.redirect('/');
    return;
  }
  var isExist = addToReadlist("The Lord Of The Flies",req.session.key);
  if(isExist)
    res.render('flies',{error:"Book Already Added"});
  else
    res.render('flies',{error:"Book Added to List"});
});
app.post('/dune',function(req,res){
  if(req.session.key== undefined)
  {
    res.redirect('/');
    return;
  }
  var isExist = addToReadlist("Dune",req.session.key);
  if(isExist)
    res.render('dune',{error:"Book Already Added"});
  else
    res.render('dune',{error:"Book Added to List"});
});
app.post('/grapes',function(req,res){
  if(req.session.key== undefined)
  {
    res.redirect('/');
    return;
  }
  var isExist = addToReadlist("The Grapes Of Wrath",req.session.key);
  if(isExist)
    res.render('grapes',{error:"Book Already Added"});
  else
    res.render('grapes',{error:"Book Added to List"});
});
app.post('/leaves',function(req,res){
  if(req.session.key== undefined)
  {
    res.redirect('/');
    return;
  }
  var isExist = addToReadlist("Leaves Of Grass",req.session.key);
  if(isExist)
    res.render('leaves',{error:"Book Already Added"});
  else
    res.render('leaves',{error:"Book Added to List"});
});
app.post('/mockingbird',function(req,res){
  if(req.session.key== undefined)
  {
    res.redirect('/');
    return;
  }
  var isExist = addToReadlist("To Kill A Mockingbird",req.session.key);
  if(isExist)
    res.render('mockingbird',{error:"Book Already Added"});
  else
    res.render('mockingbird',{error:"Book Added to List"});
});
app.post('/sun',function(req,res){
  if(req.session.key== undefined)
  {
    res.redirect('/');
    return;
  }
  var isExist = addToReadlist("The Sun And Her Flowers",req.session.key);
  if(isExist)
    res.render('sun',{error:"Book Already Added"});
  else
    res.render('sun',{error:"Book Added to List"});
});
/////////////////////////////////////////////////////////////////////////////
app.post('/search',function(req,res){
  res.render('searchresults',{search:req.body.Search})
});
app.get('/readlist',function(req,res){

  if(req.session.key!= undefined)
  {
    var oldData = JSON.parse(fs.readFileSync('users.json'));
    var pos = null;
    for(var i =0;i<oldData.length;i++)
    {
      if(req.session.key == oldData[i].user)
        pos = i;
    }
    res.render('readlist',{user:oldData[pos].books});
  }
  else
    res.redirect('/');
})
app.post('/readlist',function(req,res){
  if(req.session.key!= undefined)
  {
    var oldData = JSON.parse(fs.readFileSync('users.json'));
    var pos = null;
    for(var i =0;i<oldData.length;i++)
    {
      if(req.session.key == oldData[i].user)
        pos = i;
    }
    res.render('readlist',{user:oldData[pos].books});
  }
  else
    res.redirect('/');
});
app.post('/registration',function(req,res){
  var userN = req.body.username;
  var password = req.body.password;
  var listOfBooks = [];
  if(userN=="" || password=="")
  {
    res.render('registration',{error:"Username or password cannot be empty"});
    return;
  }
  var obj = {"user": userN, "pass":password, "books":listOfBooks};
  var array = []
  array.push(obj);
  var isExist = false;
  if(fs.readFileSync('users.json').length!=0)
  {
    var oldData = JSON.parse(fs.readFileSync('users.json'));
    for(var i=0;i<oldData.length;i++)
    {
      if((oldData[i].user)==(obj.user))
      {
       isExist = true;
       break;
      }
    }
    if(!isExist)
    {
      array = array.concat(oldData);
      fs.writeFileSync('users.json',JSON.stringify(array));
      res.redirect('/');
    }
    else
      res.render('registration',{error:"Username already exists"});
  }
  else
     {
       fs.writeFileSync('users.json',JSON.stringify(array));
       res.redirect('/');
     }
});

app.post('/home',function(req,res){
  var userN = req.body.username;
  var password = req.body.password;
  req.session.key = userN;
  var data = 0;
  if(fs.readFileSync('users.json').length!=0)
    data = JSON.parse(fs.readFileSync('users.json'));
  else
    {
      res.render('login',{error:"Wrong username or password"});
      return;
    }
  var isExist = false;
  for(var i = 0; i<data.length;i++)
  {
    if(userN == data[i].user && password == data[i].pass)
      isExist = true;
  }
  if(isExist)
    {
      res.render('home');
    }
  else
    res.render('login',{error:"Wrong username or password"});
});
function addToReadlist(str,user)
{
var oldData = JSON.parse(fs.readFileSync('users.json'));
var pos = null;
var isExist = false;
for(var i =0;i<oldData.length;i++)
{
   if(user == oldData[i].user)
     pos = i;
}
  if(oldData[pos].books.includes(str))
    isExist = true;
 if(pos!=null && !oldData[pos].books.includes(str))
  {
    isExist = false;
    oldData[pos].books.push(str)
  }
  fs.writeFileSync('users.json',JSON.stringify(oldData));
  return isExist;
}
if(process.env.PORT)
  app.listen(process.env.PORT,function(){console.log("Server started")});
else
  app.listen(3000,function(){"Server started on port 3000"});