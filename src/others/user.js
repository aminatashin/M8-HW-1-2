import express from "express";
import theModel from "./userModel.js";
import { generateToken } from "../tools.js";
import { basicAuth } from "../auth/basic.js";
import { tokenAuth } from "../auth/token.js";
import passport from "passport";
// ====================================
const userRouter = express.Router();
// ======================================
userRouter.get(
  "/googleLogin",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
userRouter.get(
  "/googleRedirect",
  passport.authenticate("google"),
  async (req, res, next) => {
    const token = req.user;
    res.redirect(`${FE_API}/user?token=${token}`);
  }
);
userRouter.post("/", async (req, res, next) => {
  try {
    const user = await theModel(req.body);
    const { _id } = await user.save();
    res.send({ _id });
  } catch (error) {
    next(error);
  }
});

userRouter.get("/", tokenAuth, async (req, res, next) => {
  try {
    const getUser = await theModel.find();
    res.send(getUser);
  } catch (error) {
    next(error);
  }
});
userRouter.get("/login", tokenAuth, async (req, res, next) => {
  const getUser = await theModel.findById(req.user._id);
  res.send(getUser);
});
userRouter.get("/me", basicAuth, async (req, res, next) => {
  const getUser = await userModel.findById(req.user._id);
  res.send(getUser);
});
userRouter.put("/", async (req, res, next) => {
  res.send();
});
userRouter.delete("/", async (req, res, next) => {
  res.send();
});
// ===========================================
userRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await theModel.approve(email, password);
  if (user) {
    const token = await generateToken({ id: user._id, role: user.role });
    res.send({ token });
  }
});

// ===========================
export default userRouter;
