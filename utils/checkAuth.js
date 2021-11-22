export default function AuthCheck() {
  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ empId: localStorage.getItem("emp_id") }),
  }).then((res) => {
    res.json().then((data) => {
      console.log("authCheck", data);
      if (data.success) {
        console.log("in true", data.success);
        return true;
      } else {
        console.log("in false", data.success);
        return false;
      }
    });
  });
}
