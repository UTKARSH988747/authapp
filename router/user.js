const express=require('express');
const router=express.Router();

const {login}=require("../controller/Auth");
const {signup}=require("../controller/Auth");
const{auth,isStudent,isAdmin}=require("../midleware/auth")

 router.post("/login",login)
router.post("/signup",signup);

router.get("/student",auth,isStudent, (req,res)=>{
   return res.json({
      success:"true",
      message:"welcome to protected route  for students"
    })
});

router.get("/admin",auth,isAdmin, (req,res)=>{
    return res.json({
       success:"true",
       message:"welcome to protected route  for admin"
     })
 });



module.exports=router;
