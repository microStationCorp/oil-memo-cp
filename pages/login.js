import Head from "next/head";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { LoginSchemaValidation } from "utils/validation";
import { useRouter } from "next/dist/client/router";
import AuthCheck from "utils/checkAuth";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [empId, setEmpId] = useState("");

  const [alertMsg, setMsg] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async function fetchData() {
      if (AuthCheck()) {
        console.log("in login page go to home");
        router.push("/");
      } else {
        console.log("in login page loading off");
        setLoading(false);
      }
    })();
  }, []);

  const onSubmit = () => {
    const { error, value } = LoginSchemaValidation({
      empId,
    });
    if (!error) {
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ empId }),
      }).then((res) => {
        res.json().then((data) => {
          if (data.success) {
            localStorage.setItem("emp_id", data.data.empId);
            router.push("/");
          } else {
            setMsg(data.msg);
            setAlertType("error");
            setOpen(true);
          }
        });
      });
    } else {
      setMsg(error.details[0].message);
      setAlertType("error");
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return !loading ? (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid container justifyContent={"center"} style={{ paddingTop: "20px" }}>
        <Grid item>
          <Card variant="outlined" sx={{ minWidth: "300px" }}>
            <CardContent>
              <Grid
                container
                direction={"column"}
                alignItems={"center"}
                spacing={2}
              >
                <Grid item>
                  <Typography variant="h5" align="center">
                    Login
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    label="Employee Id"
                    variant="outlined"
                    size="small"
                    value={empId}
                    onChange={(e) => setEmpId(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" size="small" onClick={onSubmit}>
                    LogIn
                  </Button>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => router.push("/register")}
                  >
                    Register
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertType}
          sx={{ width: "100%" }}
        >
          {alertMsg}
        </Alert>
      </Snackbar>
    </>
  ) : null;
}
