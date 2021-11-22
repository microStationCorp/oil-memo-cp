import dbConnect from "utils/dbConnect";
import Employee from "model/employeeModel";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  const { name, des, empId } = req.body;
  const parsing_data = {
    name: name.join(" "),
    des,
    empId,
  };

  switch (method) {
    case "POST":
      try {
        const find_data = await Employee.find({
          empId: parsing_data.empId,
        });

        if (find_data.length == 0) {
          const newEmployee = new Employee(parsing_data);
          const doc = await newEmployee.save();
          res.status(201).json({
            success: true,
          });
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
