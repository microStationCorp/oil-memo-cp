export default function AuthCheck() {
  if (localStorage.getItem("emp_id")) {
    return true;
  } else {
    return false;
  }
}
