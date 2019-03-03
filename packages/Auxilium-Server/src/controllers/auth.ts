import { Request, Response } from "express";
import { User } from "../models";

export const register = async (req: Request, res: Response) => {
  const { deviceId } = req.body;
  try {
    const user = new User({ deviceId });
    await user.save();
    return res.status(201).json({
      success: true,
      message: "User successfully created",
      user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error has occured. Please try again later",
      error
    });
  }
};

export const logIn = async (req: Request, res: Response) => {
  const { deviceId } = req.body;
  if (!deviceId) {
    return res.status(400).json({
      success: false,
      message: "Please use this from a device ;)"
    });
  }
  try {
    const user = await User.findOne({ deviceId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `No user found with specified deviceId: ${deviceId}. Please register and try again.`
      });
    }
    return res.status(200).json({
      success: true,
      message: "User successfully verified"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occured. Please try again later.",
      error
    });
  }
};
