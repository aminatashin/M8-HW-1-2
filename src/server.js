import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";

import otherRouter from "./others/other.js";
// ================================================
const server = express();
const port = process.env.PORT || 3003;
// ================================================
server.use(cors());
server.use("/other", otherRouter);
// ==============================================
mongoose.connect(process.env.MONGOOSE_CONNECTION);
mongoose.connection.on("connected", () => {
  console.log("Mongo is Connected");
  server.listen(port, () => {
    console.table(listEndpoints(server));
  });
});
