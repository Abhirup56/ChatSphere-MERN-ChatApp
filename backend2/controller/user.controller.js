import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import createToken from "../jwt/gentoken.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import createToken from "../jwt/gentoken.js";
export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    // 1. Check all fields
    if (!name || !email || !password || !confirmpassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check password match
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 3. Check if user exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create user (gender not passed here, so default will be used)
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // 6. Create token and respond
    createToken(newUser._id, res); // Sets cookie/token

    return res.status(201).json({
      message: "User successfully registered",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        gender: newUser.gender, // default is "Others"
      },
    });

  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(600).json({ message: "Invalid Password" });
    }

    createToken(user._id, res);
    return res.status(200).json({
      message: "USER SUCCESSFULLY LOGGED IN",
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error" });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "USER SUCESSFULLY LOGOUT" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

export const getUser = async (req, res) => {
  try { 
    const loggeduser = req.user._id;
  
    const filterUsers = await User.find({
      _id: { $ne: loggeduser },
    }).select("-password");
    res.status(200).json(filterUsers); 
  } catch (error) {
    console.error("Error in getUser controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, gender } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, gender },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

