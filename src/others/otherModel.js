import mongoose from "mongoose";
import bcrypt from "bcrypt";
// ==================================
const { Schema, model } = mongoose;
const userSchema = new Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timeStamp: true }
);
// ==================================
userSchema.pre("save", async function (next) {
  const currentUser = this;
  const plainPW = this.password;
  const hash = await bcrypt.hash("123", 11);
  currentUser.password = hash;
});

userSchema.methods.toJSON = function () {
  const userDocument = this;
  const userObject = userDocument.toObject();

  delete userObject.password;
  delete userObject.__v;

  return userObject;
};
userSchema.static("approve", async function (email, plainPW) {
  const user = await this.findOne({ email });
  if (user) {
    const isMatch = await bcrypt.compare(plainPW.user.password);
    if (isMatch) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
});
// ==================================
export default model("user", userSchema);
