import { verifyToken } from "../tools";

const tokenAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    console.log(error);
  } else {
    const credentials = req.headers.authorization.split(" ")[1];
    const payload = await verifyToken(credentials);
    if (payload) {
      req.user = {
        _id: payload._id,
        role: payload.role,
      };
      next();
    }
  }
};
