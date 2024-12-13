const mongoose = require("mongoose")

const sapmleprojects = new mongoose.Schema({
    Title: String,
    ImageUrl:[String],
    ImagePaths:[String],
    Description:String,
    Technologies:[String],
  });
const userSchema = mongoose.Schema({
    FullName :String,
    Email:String,
    TotalRating:Number,
    TotalNumberofFeddbacks:Number,
    Password:String,
    Blocked:Boolean,
    Reason:String,
    Specialities:[String],
    AccountBalance:Number,
    FreeRivisions:Number,
    RivisionCost:Number,//After free done
    Samples:[sapmleprojects]
},{timestamps:true})
const model = mongoose.model("Freelance" , userSchema);
module.exports = model;

