import "dotenv/config";
import User, { IUser } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const saltRounds = 10; // độ mạnh của hash

interface LoginResponse {
  EC: number;
  EM: string;
  accessToken?: string;
  user?: {
    email: string;
    name: string;
    role: string;
  };
}

interface JwtPayload {
  email: string;
  name: string;
}

export const createUserService = async (name: string, email: string, password: string): Promise<IUser | null> => {
  try {
    //check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      console.log("User already exists");
      return null;
    }

    //hash user password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    //save user to database
    const result = await User.create({
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

export const loginService = async (email: string, password: string): Promise<LoginResponse> => {
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
    const payload: JwtPayload = {
      email: user.email,
      name: user.name,
    };

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const accessToken = jwt.sign(
      payload,
      jwtSecret,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      } as jwt.SignOptions
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

export const getUserService = async (): Promise<Omit<IUser, 'password'>[] | null> => {
  try {
    const result = await User.find({}).select("-password");
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
