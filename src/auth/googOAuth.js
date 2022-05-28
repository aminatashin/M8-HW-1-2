import GoogleStrategy from "passport-google-oauth20";
import theModel from "../others/userModel.js";
import { generateToken } from "../tools.js";
// ================================================
const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${process.env.API}/user/googleRedirect`,
  },
  async (accessToken, refreshToken, profile, passportNext) => {
    const user = await theModel.findOne({ email: profile._json.email });
    if (user) {
      const token = await generateToken(user);
      passportNext(null, { token });
    } else {
      const { given_name, family_name, email } = profile._json;
      const newUser = new theModel({
        firstname: given_name,
        lastname: family_name,
        email: email,
        googleId: profile.id,
      });
      const currentUser = await newUser.save();
      const token = await generateToken(currentUser);
      passportNext(null, { token });
    }
  }
);
export default googleStrategy;
