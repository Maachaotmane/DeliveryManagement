import express from "express";
const router = express.Router();
import {
    signup,
    createmanager,
    signin,
    signout
} from "../controllers"
import {
    adminSignUpValidator
} from "../middlewares/adminValidator"

router.post("/signup", adminSignUpValidator, signup)
router.post("/createmanager", createmanager)
router.post("/signin", signin)
router.get("/signout", signout)

export {
    router
}