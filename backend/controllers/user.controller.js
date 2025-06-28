const User = require("../models/user.model");
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getDataUri = require("../utils/datauri");
const { default: cloudinary } = require("../utils/cloudinary");


const register = async (req, res) => {
  try {
    const { fullname, email, phonenumber, password, role } = req.body;
    if (!fullname || !email || !phonenumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false,
      });
    }
    const hashedPassword = await Bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phonenumber,
      password: hashedPassword,
      role,
    });
    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email",
        success: false,
      });
    }
    const isPasswordMatch = await Bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }
    if (role != user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phonenumber, bio, skills } = req.body;
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    if (fullname) {
      user.fullname = fullname;
    }
    if (email) {
      user.email = email;
    }
    if (phonenumber) {
      user.phonenumber = phonenumber;
    }
    if (bio) {
      user.profile.bio = bio;
    }
    if (skills) {
      user.profile.skills = skillsArray;
    }
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumename = file.originalname;
    }

    await user.save();
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      profile: user.profile,
    };
    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

module.exports = { register, login, logout, updateProfile };
