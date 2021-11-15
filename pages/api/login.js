export default async function handler(req, res) {
  const empId = req.body.empId;
  res.status(200).json({ success: true, empId });
}
