const {getAllUsers , GetUserById, Createuser, updateuserById, DeleteUserById,disableuser,ableuser,followuserById,
    unfollowuserById,getProfile, Login} = require("../Controller/UserController")

const express = require("express");
const { AuthenticateUser } = require("../utils");

const router = express.Router();
router.get("/getallusers" , AuthenticateUser ,  getAllUsers )
router.get("/" , AuthenticateUser ,  getAllUsers )
router.get("/getprofile" , AuthenticateUser ,  getProfile )
router.post("/login" , Login )
router.post("/createuser" , Createuser)
router.patch("/updateprofile",AuthenticateUser , updateuserById)

module.exports = router;


