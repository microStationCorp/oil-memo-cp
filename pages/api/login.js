import dbConnect from "utils/dbConnect";
import Employee from "model/employeeModel";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  const empId = req.body.empId;

  switch (method) {
    case "POST":
      try {
        const emp = await Employee.findOne({
          empId,
        });

        if (emp) {
          res.status(201).json({
            success: true,
            data: { empId: emp.empId },
          });
        } else {
          res.status(400).json({
            success: false,
            msg: "Employee is not registered",
            data: null,
          });
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
