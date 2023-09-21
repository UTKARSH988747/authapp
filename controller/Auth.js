const bcrypt=require('bcrypt');
const userinfo= require("../model/userdata");
const jwt= require("jsonwebtoken");

require("dotenv").config();

// signup router handler

exports.signup= async(req,res) =>{

    try{
        const {name,password,email,role}=req.body;
        // check if the user is already exit
        const exitinguser=await userinfo.findOne({email});
        if(exitinguser){
            return res.status(400).json({
                success:false,
                message:"user are alread exits"
            });
        }

        let hashpassword;
        try{
            hashpassword=await bcrypt.hash(password,10)

        }

        catch(err){
            return res.status(500).json({
                success:false,
                message:"error in password hashing"
            })
        }


        // create entry for user in database

        const data= await userinfo.create({
            name,email,password:hashpassword,role
        })
        return res.status(200).json({
            success:true,
            message:"user creates successfully"
        })
    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"user can not be registired ,please try again later"
        })

    }

}




exports.login=async(req,res)=>{
    try{

        // fetch data from request body
        const {email,password}=req.body;
        // validation for email and passwaord
        if(!email || !password){
            return res.status(400).json({
                success:false,
                messge:"please entery your email and password"
            })
        }

        // check for registered user

        let  user= await userinfo.findOne({email});

        // it is not registered
        if(!user){
            return res.status(401).json({
                success:false,
                message:"user is not registered",
            })
        }

        // verify passwaord and generatr jwt tokens
        const payload = {
            email : user.email,
            id : user._id,
            role : user.role,
        };

        if(await bcrypt.compare(password,user.password))
        {
            let token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn : "2h",
            });

             user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly : true,
            }

            res.cookie("token",token,options).status(200).json({
                success : true,
                token,
                user,
                message:"User logged in successfully"
            });

         

        }
        else{
            return res.status(403).json({
                success:false,
                message:"password incorrect"
            })
        }
    }

    catch(error){
        console.log(error)
        return res.status(500).json({
            success : false,
            message : "Login false" 
        })

    }
}



