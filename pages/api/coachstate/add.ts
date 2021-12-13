import dbConnect from "@/utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import coachModel from "@/model/coachModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  
  const { method } = req;
  const { cNum, cType, cState } = req.body;

  switch (method) {
    case "POST":
      try {
        const coach = await coachModel.find({
          cNum,
        });
        if (coach.length == 0) {
          const newCoach = new coachModel({ cNum, cType, cState });
          const doc = await newCoach.save();
          res.status(201).json({ success: true });
        } else {
          res
            .status(400)
            .json({ success: false, msg: "Data already uploaded", data: null });
        }
      } catch (e) {
        res.status(400).json({ success: false, msg: e, data: null });
      }
      break;
    default:
      res
        .status(400)
        .json({ success: false, msg: "Not Authorised", data: null });
      break;
  }
}
