const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:[true,"Please fill Email"],
    },
    Email:{
        type:String,
        required:[true,"Please fill Email"],
        unique:true
    },
    Password:{
        type:String,
        required:[true,"Please fill Email"],
    }
},{timestamps:true})

const UsersModel = mongoose.model("Users",userSchema)

module.exports= UsersModel