import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import Head from "next/dist/shared/lib/head";
import { useRouter } from "next/dist/client/router";

export default function ConfirmRegister() {
  const router = useRouter();
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
                  <Typography variant="body" align="center" color="#00c853">
                    Go to Login Page
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => router.push("/login")}
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
