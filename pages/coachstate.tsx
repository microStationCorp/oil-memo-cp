import {
  Alert,
  AlertColor,
  Button,
  Grid,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { SyntheticEvent, useState } from "react";
import { CoachStateSchemaValidation } from "@/utils/validation";
import { NextPageContext } from "next";
import dbConnect from "@/utils/dbConnect";
import coachModel from "@/model/coachModel";

export async function getServerSideProps(context: NextPageContext) {
  await dbConnect();

  const results = await coachModel.find({});
  const coaches = results.map((doc) => {
    return {
      cType: doc.cType,
      cNum: doc.cNum,
      cState: doc.cState,
    };
  });

  return {
    props: { coaches: JSON.parse(JSON.stringify(coaches)) },
  };
}

export default function CoachState({ coaches }) {
  const [cNum, setCnum] = useState("");
  const [cType, setCtype] = useState("");
  const [cState, setCstate] = useState("");

  const [alertMsg, setMsg] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>("success");
  const [open, setOpen] = useState(false);

  const onSubmitHandler = () => {
    const { error, value } = CoachStateSchemaValidation({
      cNum,
      cType: cType.toUpperCase(),
      cState,
    });

    if (error) {
      setMsg(error.details[0].message);
      setAlertType("error");
      setOpen(true);
    } else {
      fetch("/api/coachstate/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      }).then((res) => {
        res.json().then((data) => {
          if (data.success) {
            setCnum("");
            setCtype("");
            setCstate("");

            setMsg("submitted");
            setAlertType("success");
            setOpen(true);
          } else {
            setMsg(data.msg);
            setAlertType("error");
            setOpen(true);
          }
        });
      });
    }
  };

  const handleClose = (event: SyntheticEvent<Element, Event>, reason?: any) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>Coach State</title>
      </Head>

      <Grid container spacing={1} direction={"column"} alignItems={"center"}>
        <Grid item>
          <Typography variant="h4">Coach State</Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={1} alignItems={"Center"}>
            <Grid item>
              <TextField
                required
                label="Coach Number"
                variant="outlined"
                size="small"
                value={cNum}
                onChange={(e) => setCnum(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item>
              <TextField
                required
                label="Coach Type"
                variant="outlined"
                size="small"
                value={cType}
                onChange={(e) => setCtype(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item>
              <Select
                value={cState}
                onChange={(e) => setCstate(e.target.value)}
                displayEmpty
                size="small"
              >
                <MenuItem value="">
                  <em>Select State</em>
                </MenuItem>
                <MenuItem value={"RUNNING"}>RUNNING</MenuItem>
                <MenuItem value={"DAMAGED"}>DAMAGED</MenuItem>
                <MenuItem value={"RESERVED"}>RESERVED</MenuItem>
              </Select>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="small"
                onClick={onSubmitHandler}
              >
                Add New
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>list</Grid>
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
  );
}