const mongoose= require('mongoose')

const GoalSchema= new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required:true
    },
    text:{
        type:String,
        required:true
    }
},{timestamps:true})

const GoalModel = mongoose.model("Goals", GoalSchema)

module.exports = GoalModel