import express from "express";
import theModel from "./otherModel.js";
import { generateToken } from "../tools.js";

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
otherRouter.get("/", async (req, res, next) => {
  const getUser = await userModel.find();
  res.send();
});
otherRouter.get("/me", async (req, res, next) => {
  const getUser = await userModel.findById(req.user._id);
  res.send();
});
otherRouter.put("/", async (req, res, next) => {
  res.send();
});
otherRouter.delete("/", async (req, res, next) => {
  res.send();
});
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
