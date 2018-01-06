var express=require('express');
var cors=require('cors');
var mongoose=require('mongoose');

var app=express();
var bodyParser=require('body-parser');
var User=require('./models/user');
var Posts=require('./models/Post');
var auth=require('./auth.js');
mongoose.Promise=Promise;
// var posts=[
//   {message:'hello'},
//   {message:'hi'}
// ]

app.use(cors());
app.use(bodyParser.json());
app.get('/posts/:id',async function(req,res){
  var author=req.params.id;
  var posts=await Posts.find({author});
  res.send(posts);
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
});
app.post('/posts',(req,res)=>{
  var postData=req.body;
  postData.author='5a3cebee4c67ff0494baf694';
  var post=new Posts(postData);
  post.save((err,result)=>{
    if(err){
      console.log('saving post is an error');
      return res.Status(500).send({message:'saving post error'});
    }
     res.sendStatus(200);
  })

})
app.get('/users',async function(req,res){
  try{

    var users=await User.find({},'-password -__v');
    res.send(users);
  }

  catch(error){
    console.error(error);
    res.send(500);
  }
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
});
app.get('/profile/:id',async function(req,res){
  try{

    var user=await User.findById(req.params.id,'-password -__v');
    res.send(user);
  }

  catch(error){
    console.error(error);
    res.send(500);
  }
  // console.log(req.params.id);
  // res.send(200);
  //  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
});

// app.post('/register',auth.register);
// app.post('/login',auth.login);
mongoose.connect('mongodb://localhost:27017/local', { useMongoClient: true },(err)=>{
  if(!err)
  console.log('mongo started');
})
app.use('/auth',auth)
app.listen(3000);
