const mysql=require("mysql")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const cookieParser=require("cookie-parser")
const knex=require("../model/create_tables")
const { hash } = require("bcrypt")
const { JsonWebTokenError } = require("jsonwebtoken")

const signup=(req,res)=>{
    const hash=bcrypt.hashSync(req.body.password,10)
    const data={
        name:req.body.name,
        email:req.body.email,
        password:hash
    }
        knex("register").insert(data)
            .then((result)=>{
                res.send({sucess: "signup sucessfully"})
            })
            .catch((err)=>{
                if(err){
                    console.log(err);
                    res.status(400).send({error:err})
                }
            })
}


const get_signup=(req,res)=>{
    knex.from("register").select("*")
    .then((row)=>{
        res.send(row)
    })
    .catch((err)=>{
        res.json({
            message:err
        })
    })
}

const login=(req,res)=>{
    const user=req.body;
    knex.from("register").select("*").where("email",user.email)
        .then((data)=>{
            console.log(data)
            if (data.length>0){
                for (d of data)
                    userPassword=d['password']
                const verified=bcrypt.compareSync(user.password,userPassword.toString());
                console.log(d)
                if(verified){
                    jwt.sign({user_id:d.user_id},"key",(err,token)=>{
                        if (token){
                            console.log(token)
                            res.cookie('jwt',token)
                            res.send({
                                message:"you are signup succesfully",
                                Token:token
                            })
                        }
                    })
                }else{
                    res.send("password is not correct")
                }
            }else{
                res.status(403).send("user doen't exist")
            }
        })
}

const verifyToken=(req,res,next)=>{
    try{
        var token=req.cookies.jwt
        console.log(token)
        var decode=jwt.verify(token,'key')
        req.userdata=decode
        console.log(decode)
        next()
    }catch(err){
        console.log(err)
        res.send({message:'invalid token'})
    }
}


module.exports={signup,get_signup,login,verifyToken}