const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    FullName :String,
    Email:String,
    Password:String,
    ProfileImageurl:String,
    ProfileImagePath:String
},{timestamps:true})
const model = mongoose.model("Admin" , userSchema);
module.exports = model;

