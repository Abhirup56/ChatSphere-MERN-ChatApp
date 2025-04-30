import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createToken from "../jwt/gentoken.js";
export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Password not match" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exist" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      if (newUser) {
        createToken(newUser._id, res);
        return res.status(201).json({
          message: "USER SUCESSFULLY REGISTERD",
          user: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
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

