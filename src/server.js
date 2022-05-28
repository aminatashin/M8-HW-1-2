import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import Passport from "passport";
import googleStrategy from "./auth/googOAuth.js";
import userRouter from "./others/user.js";
// ================================================
const server = express();
const port = process.env.PORT || 3001;
Passport.use("google", googleStrategy);
server.use(cors());
server.use(express.json());
server.use(Passport.initialize());
// ================================================

server.use("/user", userRouter);
// ==============================================
mongoose.connect(process.env.MONGOOSE_CONNECTION);
mongoose.connection.on("connected", () => {
  console.log("Mongo is Connected");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`${port}`);
  });
});
