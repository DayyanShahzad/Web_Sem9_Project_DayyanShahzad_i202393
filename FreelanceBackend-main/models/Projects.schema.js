const mongoose = require("mongoose")

  const chat = new mongoose.Schema({
    Text: String,
    Username:String,
    UserId:String,
    Time:String,
  });

const responseSchema = mongoose.Schema({
    UserId :String,
    Deadline:String,
    Title:String,
    Requirements:String,
    Description:String,
    Budget:Number,
    Chat:[chat],
    Username :String,  //User who is uploading it (Customer)
    Assigned:String,   //UserId of the freelancer to wchich project is assigned
    AssignedUsername:String,
    Status:String,
    Paid:Number,
    Tip:Number,
    PaidOnDate:String,
    RivisionsDone:Number,
    Keywords:[String],
},{timestamps:true})
const model = mongoose.model("Projects" , responseSchema);
module.exports = model;
