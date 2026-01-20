const mongoose = require("mongoose");

const connectdb = async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/noteapp");
        console.log("database connect");
    }catch(error){
        console.log("mongodb connection failed"+error);
    }
}

module.exports = connectdb;