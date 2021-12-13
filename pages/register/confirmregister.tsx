import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import Head from "next/dist/shared/lib/head";
import { signIn } from "next-auth/react";

export default function ConfirmRegister() {
  return (
    <>
      <Head>
        <title>Confirm registration</title>
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
                  <Typography variant="h6" align="center">
                    User Registration Complete
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" align="center" color="#00c853">
                    Go to Login Page
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => signIn()}
                  >
                    LogIn
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
