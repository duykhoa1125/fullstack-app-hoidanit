require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const saltRounds = 10; // độ mạnh của hash
const jwt = require("jsonwebtoken");

const createUserService = async (name, email, password) => {
  try {
    //check if user already exists
    const user = await User.findOne({email})
    if(user){
      console.log("User already exists");
      return null
    } 

    //hash user password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    //save user to database
    let result = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: "user",
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const loginService = async (email, password) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return {
        EC: 1,
        EM: "User not found",
      };
    }
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return {
        EC: 2,
        EM: "Wrong password",
      };
    }
    const payload = {
      email: user.email,
      name: user.name,
    };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      }
    );
    return {
      EC: 0,
      EM: "Login successful",
      accessToken,
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      EC: -1,
      EM: "Internal server error",
    };
  }
};

const getUserService = async () =>{
  try{
    let result = await User.find({}).select("-password")
    return result
  } catch (error){
    console.log(error)
    return null
  }
}

module.exports = {
  createUserService,
  loginService,
  getUserService
};
