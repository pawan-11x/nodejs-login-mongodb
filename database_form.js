
console.log("Welcome to my Database");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname));   // serve files from same folder

mongoose.connect("mongodb://localhost:27017/login_DB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const schema = new mongoose.Schema({ 
    username:String,
    password:String
});

const User = mongoose.model("login",schema);

app.post("/login",async(req,res)=>{
    console.log(req.body);

    const data = new User({
        username:req.body.username,
        password:req.body.password
    });

    await data.save();

    res.send("Data saved successfully");

});

app.listen(5000,()=>{
console.log("Server running on port 5000");
});