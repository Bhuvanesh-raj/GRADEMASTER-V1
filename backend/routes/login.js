const express=require("express");
const Router=express.Router();
const {users:Users}=require("../models/mongodatabase");
const md5=require("md5");
const Login=Router.route("/");
const jwt=require("jsonwebtoken");

Login.post(async (req,res)=>{
    const {username,password}=req.body;
    const hashedpassword=md5(password);
    try{
        const responce=await Users.find({username,password:hashedpassword});
        console.log(responce);
        // setTimeout(()=>console.log(responce),10000);
        if(responce.length!==0){
            // console.log(responce);
            const roles=Object.values(responce[0].roles);
            const dob=responce[0].dob;
            const collegename=responce[0].collegename;
            const registernumber=responce[0].registernumber;
            const year=responce[0].year;
            const accesstoken=jwt.sign({
                "userInfo":{
                    username:username,
                    dob:dob,
                    registernumber:registernumber,
                    collegename:collegename,
                    year:year,
                    roles:roles
                }
            }
            ,process.env.ACCESS_TOKEN,
            {
                expiresIn:'120s'
            }
            );
            // const refreshtoken=jwt.sign({
            //     "userInfo":{
            //         username:username,
            //         dob:dob,
            //         registernumber:registernumber,
            //         collegename:collegename,
            //         year:year,
            //         roles:roles
            //     }
            // },
            // process.env.REFRESH_TOKEN,
            // {
            //     expiresIn:"60s"
            // });
            // await Users.updateOne({username:username,password:md5(password)},{$set:{refreshtoken:refreshtoken}});
            // console.log(refreshtoken);
            // res.cookie('jwt',refreshtoken,{httpOnly:true,maxAge:24*60*60*1000});
            console.log("USER FOUND");
            res.json({accesstoken,dob,registernumber,year,collegename,roles}).status(200);
        }
        else{
            // res.json({message:"Unauthorised"});
            console.log("NO USER FOUND");
            res.sendStatus(401);
            console.log("NO USER FOUND");
            
        }
    }   
    catch(e){
        console.log("TRY AGAIN");
        console.log(e);
        res.json({message:"TRY AGAIN"}).sendStatus(500);
        console.log("TRY AGAIN");
    }
}).get((req,res)=>res.send("welcome to the get page!!"));

module.exports=Router;