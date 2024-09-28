const mongoose= require("mongoose")

const ConnectDatabase=()=>{
    mongoose.connect(process.env.DB_URL).then((con)=>{
        console.log("mogoose connected to database "+ con.connection.host);
        
    })

}

module.exports=ConnectDatabase