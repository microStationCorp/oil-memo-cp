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
} from "@mui/material";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [empId, setEmpId] = useState("");
  const [name, setName] = useState("");
  const [des, setDes] = useState("");

  useEffect(() => {
    setLoading(true);
    if (AuthCheck()) {
      router.push("/");
    }
    setLoading(false);
  }, []);
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
                  <Button variant="contained" size="small">
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
    </>
  ) : null;
}
