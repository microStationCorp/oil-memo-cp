import Head from "next/dist/shared/lib/head";
import { useEffect, useState } from "react";
import AuthCheck from "utils/checkAuth";
import { useRouter } from "next/dist/client/router";
import {
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { RegisterSchemaValidation } from "utils/validation";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [empId, setEmpId] = useState("");
  const [name, setName] = useState("");
  const [des, setDes] = useState("");

  const [alertMsg, setMsg] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (AuthCheck()) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = () => {
    const { error, value } = RegisterSchemaValidation({
      name: name.toUpperCase().trim().split(" "),
      empId,
      des,
    });

    if (!error) {
      fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      }).then((res) => {
        res.json().then((data) => {
          console.log(data);
          if (data.success) {
            // setMsg("submitted");
            // setAlertType("success");
            router.push("/register/confirmregister");
          } else {
            setMsg(data.msg);
            setAlertType("error");
            setOpen(true);
          }
        });
      });
    } else {
      console.log(error);
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
        <title>Register Page</title>
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
                    Register
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    label="Name"
                    variant="outlined"
                    size="small"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
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
                  <Select
                    value={des}
                    onChange={(e) => setDes(e.target.value)}
                    displayEmpty
                    size="small"
                  >
                    <MenuItem value="">
                      <em>Select Designation</em>
                    </MenuItem>
                    <MenuItem value={"SSE/TL&AC/CP"}>SSE/TL&AC/CP</MenuItem>
                    <MenuItem value={"JEE/TL&AC/CP"}>JEE/TL&AC/CP</MenuItem>
                  </Select>
                </Grid>
                <Grid item>
                  <Button variant="contained" size="small" onClick={onSubmit}>
                    Register
                  </Button>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => router.push("/login")}
                  >
                    Login
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
