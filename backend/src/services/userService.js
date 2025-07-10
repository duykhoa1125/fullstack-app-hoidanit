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

module.exports = {
  createUserService,
};
