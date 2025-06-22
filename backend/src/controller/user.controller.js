import bcrypt from "bcrypt";
import { z } from "zod";
import User from "../models/userModel.js";
import { generateToken } from "../utils/token.js";
const userSchema = z.object({
  name: z
    .string()
    .min(3, { message: "username atlest 3 character long" })
    .max(255),
  email: z.string().email({ message: "invalid email" }),
  password: z
    .string()
    .min(8, { message: "password atlest 8 character long" })
    .max(100),
});

export const register = async (req, res) => {
  try {
        console.log("register body : ", req.body);

    const { name, email, password } = req.body;
    
    // validate data
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    const data = userSchema.safeParse({ name, email, password });

    if (!data.success) {
      const mappedError = data.error.errors.map((er) => er.message);
      console.log(mappedError);

      return res.status(400).json({ error: mappedError[0] });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email already exists. Please use a different one." });
    }
    // create a new user
    const user = new User({ name, email, password });
    // hash the password
    user.password = await bcrypt.hash(password, 10);

    await user.save();
    const token = await generateToken(user, res);
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in registering user" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = await generateToken(user, res);

    res.cookie("jwt", token, { expiresIn: "30d", httpOnly: true });

    return res
      .status(200)
      .json({ message: "User login successfully", user, token });
  } catch (error) {
    res.status(500).json({ message: "Error in login user" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      path: "/",
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging out user" });
  }
};

export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
    
        if (!email  || !newPassword) {
        return res
            .status(400)
            .json({ message: "Please provide all required fields" });
        }
    
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }
    
        if (newPassword.length < 8 || newPassword.length > 100) {
            return res.status(400).json({
                message: "New password must be between 8 and 100 characters long",
            });
        }
         
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
    
        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error resetting password" });
    }
  }