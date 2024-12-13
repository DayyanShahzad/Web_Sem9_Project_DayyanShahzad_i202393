const {getallcutomers,getallsellers,getallfreelancers,getallprojects,getallsellerprojectsbytechnology,
    getallsellerprojects ,getallfreelanceprojectsbytechnology,getallfreelanceprojectsassignedbyid
,gettopfreelancecategoriesbyrevenuesort,getallfreelancersbyrevenuesort,getallsellerprojectsbyrevenuesort,
getallfreelanceprojectsuploadedbyid,getallsellerprojectsbyid,gettopfreelancers,Login,gettopsellers,
gettopcustomers,gettopsellerscategories,gettopsellercategoriesbyrevenue,addtechnology,deletetechnology,
gettopfreelancerscategories,disablefreelancer,disablecustomer,disableseller,ablecustomer,ableseller,ablefreelancer,
addadmin,updateuserprofileById,getprofile,changepassword,getallsellerprojectdetailbyid,getcustomerbyid,
getallpurchases,getallnotifications,getallpurchasesincludedetail,getadminstats} = require("../Controller/AdminController")
const express = require("express");
const { AuthenticateUser } = require("../utils");
const router = express.Router();
router.post("/login"  ,  Login )
router.get("/getallcutomers" ,AuthenticateUser ,  getallcutomers )
router.get("/getallsellers" ,AuthenticateUser ,  getallsellers )
router.get("/getfreelancers" ,AuthenticateUser ,  getallfreelancers )
router.get("/getallfreelanceprojects" ,AuthenticateUser ,  getallprojects )
router.get("/getcustomerbyid/:id" ,AuthenticateUser ,  getcustomerbyid )
router.get("/getallfreelanceprojectsbytechnology/:technology" ,AuthenticateUser ,  getallfreelanceprojectsbytechnology )
router.get("/gettopfreelancecategoriesbyrevenuesort" ,AuthenticateUser ,  gettopfreelancecategoriesbyrevenuesort )
router.get("/getallfreelancersbyrevenuesort" ,AuthenticateUser ,  getallfreelancersbyrevenuesort )
router.get("/getallfreelanceprojectsassignedbyid/:id" ,AuthenticateUser ,  getallfreelanceprojectsassignedbyid )
router.get("/getallfreelanceprojectsuploadedbyid/:id" ,AuthenticateUser ,  getallfreelanceprojectsuploadedbyid )
router.get("/getallsellerprojects" ,AuthenticateUser ,  getallsellerprojects )
router.get("/getallsellerprojectsbytechnology/:technology" ,AuthenticateUser ,  getallsellerprojectsbytechnology )
router.get("/getallsellerprojectsbyrevenuesort" ,AuthenticateUser ,  getallsellerprojectsbyrevenuesort )
router.get("/getallsellerprojectsbyid/:id" ,AuthenticateUser ,  getallsellerprojectsbyid )
router.get("/getallsellerprojectdetailbyid/:id" ,AuthenticateUser ,  getallsellerprojectdetailbyid )
router.get("/getallnotifications"  ,AuthenticateUser,  getallnotifications )
router.get("/getadminstats" ,AuthenticateUser ,  getadminstats )
router.get("/gettopfreelancers" ,AuthenticateUser ,  gettopfreelancers )
router.get("/getallpurchases/:id",AuthenticateUser  ,  getallpurchases )
router.get("/getallpurchasesincludedetail/:id" ,AuthenticateUser ,  getallpurchasesincludedetail )
router.get("/gettopsellers" ,AuthenticateUser ,  gettopsellers )
router.get("/gettopcustomers" ,AuthenticateUser ,  gettopcustomers )
router.get("/gettopsellercategoriesbyrevenue" ,AuthenticateUser ,  gettopsellercategoriesbyrevenue )
router.get("/gettopsellerscategories" ,AuthenticateUser ,  gettopsellerscategories )
router.get("/getprofile" ,AuthenticateUser ,  getprofile )
router.get("/gettopfreelancerscategories" ,AuthenticateUser ,  gettopfreelancerscategories )
router.put("/disablefreelancer" ,AuthenticateUser ,  disablefreelancer )
router.put("/disableseller" ,AuthenticateUser ,  disableseller )
router.put("/disablecustomer",AuthenticateUser  ,  disablecustomer )
router.put("/ablefreelancer" ,AuthenticateUser ,  ablefreelancer )
router.put("/ableseller"  ,  ableseller )
router.put("/ablecustomer" ,AuthenticateUser ,  ablecustomer )
router.put("/changepassword" ,AuthenticateUser ,  changepassword )
router.post("/addtechnology"  ,  addtechnology )
router.delete("/deletetechnology/:id" ,AuthenticateUser ,  deletetechnology )
router.patch("/updateprofile",AuthenticateUser , updateuserprofileById)
module.exports = router;