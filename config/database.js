const mongoose=require('mongoose')

require("dotenv").config();

exports.database=()=>{
    mongoose.connect(process.env.url,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log("sucessfully connected")
    })
    .catch((err)=>{
        console.log("db connection issue")
        // console.err(err);
        process.exit(1)
    })
}


