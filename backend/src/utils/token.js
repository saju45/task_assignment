import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
export const generateToken = async (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  await User.findByIdAndUpdate(user?._id, { token });
  return token;
};