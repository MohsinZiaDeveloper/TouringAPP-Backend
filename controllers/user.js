import bcrypt from "bcryptjs";
import { response } from "express";
import jwt from "jsonwebtoken";

import userModal from "../models/user.js";

const secret = "test";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const olduser = await userModal.findOne({ email });
    if (!olduser) {
      return res.status(404).json({ massage: "User Does not exist" });
    }

    const ispasswordCorrect = await bcrypt.compare(password, olduser.password);
    if (!ispasswordCorrect) {
      return res.status(400).json({ massage: "invalid credientails " });
    }

    const token = jwt.sign({ email: olduser.email, id: olduser._id }, secret, {
      expiresIn: "1hr",
    });
    res.status(200).json({ result: olduser, token });
  } catch (error) {
    response.status(500).json({ message: "Something went Wrong" });
    console.log(error);
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const oldUser = await userModal.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ massege: "user already exist " });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await userModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1hr",
    });
    res.status(201).json({ result, token });
  } catch (error) {
    response.status(500).json({ message: "Something went Wrong" });
    console.log(error);
  }
};

export const googleSignIn = async (req, res) => {
  const { email, name, token, googleId } = req.body;
  try {
    const oldUser = await userModal.findOne({ email });
    if (oldUser) {
      const result = { _id: oldUser._id.toString(), email, name };
      return res.status(200).json({ result, token });
    }
    const result = await userModal.create({
      email,
      name,
      googleId,
    });
    return res.status(200).json({ result, token });
  } catch (error) {
    response.status(500).json({ message: "Something went Wrong" });
    console.log(error);
  }
};
