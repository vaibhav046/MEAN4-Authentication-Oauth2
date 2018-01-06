var User=require('./models/user');
var bcrypt=require('bcrypt-nodejs');
var jwt=require('jwt-simple');
var express=require('express');
var router=express.Router();
// module.exports={
router.post('/register',(req,res)=>{
                console.log(req.body);
                var userData=req.body;
                var user=new User(userData);
                user.save((err,result)=>{
                  if(err)
                    console.log('saving user is an error');
                  res.send(200);
                })
              })
    router.post('/login',async (req,res)=>{
                console.log(req.body);
                var userData=req.body;

                var user=await User.findOne({email:userData.email})
                //console.log(userData.email);
                if(!user)
                  //res.status(401).send({message:"email or password invalid"});
                   return res.sendStatus(401);

                bcrypt.compare(userData.password,user.password,(err,isMatch)=>{
                //   console.log(typeof userData.password );
                //   console.log(typeof User.password );
                // console.log(err);
                // console.log(isMatch);
                  if(!isMatch){
                    //res.status(401).send({message:"email or password invalid"});
                    //console.log('aaaaa'+userData.password);
                    //console.log(user.password);
                    return res.sendStatus(401);
                    }
                    var payload={sub:user._id};
                    var token=jwt.encode(payload,'123');

                  //console.log(user);
                  return res.status(200).send({token});

                })
                // if(userData.password!=user.password)



                 //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
            })


      module.exports=router;
//}
