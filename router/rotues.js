const express=require("express")
const {signup,get_signup,login,verifyToken}=require("../controller/controller1")
const router=express.Router()

const {post_data, get_post}=require("../controller/get_post")
const {likedislike,get_likedislike}=require("../controller/likedislike")

router.post("/signup",signup)

router.get("/get_signup",get_signup)

router.post("/login",login)

router.post("/post_data",verifyToken,post_data)

router.get("/get_post/:post_id",get_post)

router.post("/likedislike",verifyToken,likedislike)

router.get("/getlikedislike",get_likedislike)


module.exports=router