const express = require("express")
const { loginUser, signupUser } = require("../controllers/userController")
const userRouter = express.Router()

//login route
userRouter.post("/login", loginUser)

// signup route
userRouter.post("/signup", signupUser)

module.exports = userRouter