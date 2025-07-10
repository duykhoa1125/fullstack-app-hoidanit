const User = require("../models/User");
const bcrypt = require("bcryptjs");
const saltRounds = 10; // độ mạnh của hash

const createUserService = async (name, email, password) => {
  try {
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
    if (user) {

      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (!isMatchPassword) {

        return {
          EC: 1,
          EM: "User not found",
        };
      } else {
        return "create access token";
      }

      return;
    } else {
      return {
        EC: 2,
        EM: "User not found",
      };
    }
    return result;
  } catch {
    console.log(error);
    return null;
  }
};

module.exports = {
  createUserService,
  loginService,
};
