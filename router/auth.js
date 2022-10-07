const express=require('express');
const bcrypt=require('bcryptjs');
const router = express.Router();
const jwt=require('jsonwebtoken');
require('../db/conn');
const User = require("../model/userSchema");
router.get('/',(req,res)=>{     //'/'-> represents root folder path and this pieace of code create a route to our page. 
    res.send(`Hello world from router js`);

});
// below code is using promises
// router.post('/register',(req,res)=>{

//     const {name,email, phone, work, password, cpassword}= req.body;
//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error:"errrroorrrrr"});
//     }   

//     User.findOne({email:email}).then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error: "Email already in db"});
//         }

//         const user= new User({name,email, phone, work, password, cpassword});

//         user.save().then(()=>{                                                            //this .then part is basically promisses.
//             res.status(201).json({message: "user created success"});
//         }).catch((err)=>res.status(500).json({error: "failed to register"}));
//     }).catch(err=>{console.log(err);});
//     // console.log(name);
//     // console.log(email);
//     // res.json({message: req.body});
//     // res.send("mera register page");

// })


// here begins the same code as above using Async-Await

router.post('/register',async (req,res)=>{

    const {name,email, phone, work, password, cpassword}= req.body;
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:"errrroorrrrr,fill the fields properly"});
    } 
    
    try{
        const userExist = await User.findOne({email:email})
        if(userExist){
            return res.status(422).json({error: "Email already in db"});
        }
        else if(password !=cpassword){
            return res.status(422).json({error: "password dosen't match"});
        } 
        else{
            const user= new User({name,email, phone, work, password, cpassword});
            //hashing 
    
            await user.save();
    
            
            res.status(201).json({message: "user created success"});
        }    

        
  
    } catch(err){
        console.log(err);
    }


   

})


//login route

router.post('/signin',async (req,res)=>{
    // console.log(req.body);
    // res.json({message: "awesome"});
    try{
        let token;
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({error:"Plzz fill the details login"})
        }
        const userLogin= await User.findOne({email:email});

        //console.log(userLogin);  
        if(userLogin){
            const isMatch=await bcrypt.compare(password,userLogin.password);

            token=await  userLogin.generateAuthToken();
            res.cookie("jwtoken",token,{
                expire:new Date(Date.now()+25892000000),
                httpOnly:true
            });
            if(!isMatch){
                res.status(400).json({error:"invalid cridential password"});
            }
            else{
                res.json({message:"user sign in Success"});
            }
        }
        else{
            res.status(400).json({error:"invalid cridential"});
        }

       

    }catch(err){
        console.log(err);

    }
})

module.exports=router; 