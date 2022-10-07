const dotenv=require("dotenv");
const mongoose=require('mongoose');
const express= require('express');
const app=express();

dotenv.config({path:'./config.env'});
require('./db/conn');

app.use(express.json());
// we link the router file 
app.use(require('./router/auth'));
// const User= require('./model/userSchema');
const PORT=process.env.PORT;
 //middleware



const middlware =(req,res,next)=>{
    console.log(`my middlware`);
    next();
};


// app.get('/',(req,res)=>{     //'/'-> represents root folder path and this pieace of code create a route to our page. 
//     res.send(`Hello world`);
 
// });

app.get('/about',middlware,(req,res)=>{     //'/'-> represents root folder path and this pieace of code create a route to our page. 
    res.send(`Hello about world`);

});

app.get('/contact',(req,res)=>{     //'/'-> represents root folder path and this pieace of code create a route to our page. 
    res.send(`Hello contact world`);

});

app.get('/signin',(req,res)=>{     //'/'-> represents root folder path and this pieace of code create a route to our page. 
    res.send(`Hello login contact world`);

});
app.get('/signup ',(req,res)=>{     //'/'-> represents root folder path and this pieace of code create a route to our page. 
    res.send(`Hello signup contact world`);

});
app.listen(PORT,()=>{     // there must be some function from the server that listen to the request of the user which we can access throught any port here we used 3000.
    console.log(`server is running at port number ${PORT}`);
});