import coachModel from "@/model/coachModel";
import dbConnect from "@/utils/dbConnect";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { NextPageContext } from "next";
import Head from "next/head";

export default function State({ state, data }) {
  console.log(data);
  return (
    <>
      <Head>
        <title>{state} coach</title>
      </Head>
      <Grid container spacing={1} direction={"column"}>
        <Grid item>
          <Typography variant="h4" textAlign={"center"}>
            {state} COACH
          </Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            {data.map((coach) => (
              <Grid item xs={12} sm={6} md={4} key={coach.id}>
                <Card variant="elevation" elevation={1}>
                  <Typography textAlign={"center"} variant="body1">
                    {coach.cNum}-{coach.cType}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  await dbConnect();
  const state = context.query.state;

  const results = await coachModel
    .find({ cState: state })
    .select("cNum cType _id");

  return {
    props: {
      state,
      data: results.map((result) => {
        return {
          cNum: result.cNum,
          cType: result.cType,
          id: result._id.toString(),
        };
      }),
    },
  };
}
