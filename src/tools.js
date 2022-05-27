import jwt from "jsonwebtoken";

export const generateToken = (payload) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: "1week" },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    )
  );
export const verifyToken = (token) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    })
  );
