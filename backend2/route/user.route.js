import express from "express"
import {signup,login,logout, getUser, updateProfile }  from "../controller/user.controller.js"
import secureRoute from "../midddleware/secureRoute.js";


const userRouter = express.Router()

userRouter.post("/signup",signup);

userRouter.post("/login",login);

userRouter.post("/logout",logout);

userRouter.get("/getuser",secureRoute,getUser);

userRouter.put("/update", secureRoute, updateProfile);

export default userRouter;