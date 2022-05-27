import atob from "atob";
import theModel from "../others/otherModel.js";
// ==========================================
export const basicAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    console.log(error);
  } else {
    const credentials = req.headers.authorization.split(" ")[1];
    const [email, password] = atob(credentials).split(":");
    const userProve = await theModel.approve(email, password);
    if (userProve) {
      req.user = userProve;
      next();
    }
  }
};
