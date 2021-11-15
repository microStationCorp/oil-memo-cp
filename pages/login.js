import Head from "next/head";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { LoginSchemaValidation } from "utils/validation";
import { useRouter } from "next/dist/client/router";
import AuthCheck from "utils/checkAuth";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [isAuth, setAuth] = useState(false);
  const [empId, setEmpId] = useState("");

  const [alertMsg, setMsg] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (AuthCheck()) {
      router.push("/");
    }
    setLoading(false);
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
          console.log(data);
          localStorage.setItem("emp_id", data.empId);
        });
      });
    } else {
      setMsg(error.details[0].message);
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
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={alertMsg}
      />
    </>
  ) : null;
}
