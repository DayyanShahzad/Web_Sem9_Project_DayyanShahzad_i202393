const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    FullName :String,
    Email:String,
    Role:String,
    Password:String,
    Blocked:Boolean,
    Reason:String,   // Reason to block 
    Interests:[String],
    AccountBalance:Number,
},{timestamps:true})
const model = mongoose.model("Customer" , userSchema);
module.exports = model;

