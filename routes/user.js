const express=require("express")
const router=express.Router()

const userControllers=require("../controllers/user")
const authentication=require("../middleware/authenticate")

router.post("/signup",userControllers.signup)
router.post("/login",userControllers.login)

module.exports=router