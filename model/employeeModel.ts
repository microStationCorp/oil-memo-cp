import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  empId: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  des: {
    type: String,
    required: true
  },
  isEmployee: {
    type: Boolean,
    required: true,
    default: false
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
});

export default mongoose.models.Employee ||
  mongoose.model("Employee", EmployeeSchema);
