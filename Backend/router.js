const express=require("express")
const router=express.Router()
const {registerUser,loginUser, getUser}=require('./Controller/userController')
const { getGoals, postGoal, putGoal, deleteGoal } = require("./Controller/GoalController")
const { protect } = require("./Middleware/authMiddleware")


router.route("/newUser").post(registerUser)
router.route("/loginUser").post(loginUser)
router.route("/getUser").get(protect,getUser)
router.route("/").get(protect,getGoals).post(protect,postGoal)
router.route("/:id").put(protect,putGoal).delete(protect,deleteGoal)

module.exports=router            