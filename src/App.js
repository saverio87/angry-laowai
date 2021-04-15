import "./App.css";
import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import formatDate from "./utils/formatDate";
import { makeStyles } from "@material-ui/core/styles";

import { Report } from "./Report";
import { Grid, Typography, Box } from "@material-ui/core/";
import { SubmitReport } from "./SubmitReport";

const useStyles = makeStyles((theme) => ({
  reportContainer: {
    padding: "3rem",
    [theme.breakpoints.down("sm")]: {
      padding: "0.5rem",
    },
  },
}));

function App() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  const getReports = () => {
    setLoading(true);
    ref.orderBy("date", "desc").onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setReports(items);
      setLoading(false);
    });
  };

  useEffect(() => {
    getReports();
  }, []);

  const ref = firebase.firestore().collection("reports");

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Typography variant="h3">
        <Box textAlign="center">Angry laowai</Box>
      </Typography>

      <Grid container spacing={2} className={classes.reportContainer}>
        {reports.map((report) => (
          <Report
            key={report.id}
            city={report.city}
            date={formatDate(report.date)}
            tags={report.tags}
            title={report.title}
            report={report.report}
          />
        ))}
      </Grid>
      <Grid container style={{ height: "2rem" }} />

      <SubmitReport />

      <Grid container style={{ height: "2rem" }} />
    </>
  );
}

export default App;
