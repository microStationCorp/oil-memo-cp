import Head from "next/head";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

export default function Home() {
  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid container justifyContent={"center"} style={{ paddingTop: "20px" }}>
        <Grid item>
          <Card variant="outlined" sx={{ minWidth: "300px" }}>
            <CardContent>
              <Grid container direction={"column"} alignItems={"center"} spacing={2}>
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
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" size="small">LogIn</Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
