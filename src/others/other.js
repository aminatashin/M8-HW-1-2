import express from "express";
import theModel from "./otherModel.js";
import { generateToken } from "../tools.js";
import { basicAuth } from "../auth/basic.js";
import { tokenAuth } from "../auth/token.js";

// ====================================
const otherRouter = express.Router();
// ======================================
otherRouter.post("/", async (req, res, next) => {
  try {
    const user = await theModel(req.body);
    const { _id } = await user.save();
    res.send({ _id });
  } catch (error) {
    next(error);
  }
});
otherRouter.get("/", tokenAuth, async (req, res, next) => {
  try {
    const getUser = await theModel.find();
    res.send(getUser);
  } catch (error) {
    next(error);
  }
});
otherRouter.get("/login", tokenAuth, async (req, res, next) => {
  const getUser = await theModel.findById(req.user._id);
  res.send(getUser);
});
otherRouter.get("/me", basicAuth, async (req, res, next) => {
  const getUser = await userModel.findById(req.user._id);
  res.send(getUser);
});
otherRouter.put("/", async (req, res, next) => {
  res.send();
});
otherRouter.delete("/", async (req, res, next) => {
  res.send();
});
// ===========================================
otherRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await theModel.approve(email, password);
  if (user) {
    const token = await generateToken({ id: user._id, role: user.role });
    res.send({ token });
  }
});

// ===========================
export default otherRouter;
