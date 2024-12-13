const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    ProjectId:String,
    BuyerName:String,
    SellerId:String,
    Amount:Number,
    BuyerId:String
},{timestamps:true})
const model = mongoose.model("Purchases" , userSchema);
module.exports = model;

