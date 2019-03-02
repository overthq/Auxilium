import * as socketIO from "socket.io";
import { Request, Response } from "express";
import { Emergency } from "../models";

export const createEmergency = async (req: Request, res: Response) => {
  const { location, userId } = req.body;
  const io: socketIO.Server = req.app.get("io");
  try {
    const emergency = new Emergency({ userId, location });
    await emergency.save();
    await io.emit("emergency", emergency);
    return res.status(200).json({
      success: true,
      message: "Emergency logged"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error has occured. Please try again later."
    });
  }
};

export const getNearbyEmergencies = () => {};
