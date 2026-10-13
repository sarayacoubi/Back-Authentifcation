const express = require("express");

const userRouter = express.Router();
const { SignUp } = require("../Controllers/User");
const { SignIn } = require("../Controllers/User");
const { verifSignUp, validation , verifSignIn} = require("../Middlewares/Validation");
const {isAuth} = require("../Middlewares/isAuth");

userRouter.post("/SignUp", verifSignUp, validation, SignUp);

userRouter.post("/SignIn",verifSignIn,validation, SignIn);

userRouter.get('/CurrentUser', isAuth, (req, res)=>{
  res.send(req.user)  
})

module.exports = userRouter;
