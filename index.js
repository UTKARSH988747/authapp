const express=require('express');
const app=express();

require("dotenv").config();
const PORT=process.env.PORT || 4000

const cookie=require("cookie-parser")
app.use(cookie());

app.use(express.json());

require("./config/database").database()

const user=require("./router/user");
app.use("/api/v1",user)


app.listen(PORT,()=>{
    console.log("app is listin at port" ,PORT)
})


