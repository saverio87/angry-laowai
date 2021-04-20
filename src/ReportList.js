import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import formatDate from "./utils/formatDate";
import { Report } from "./Report";
import { Container, Grid, Typography, Box } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  reportContainer: {
    padding: "3rem",
    [theme.breakpoints.down("sm")]: {
      padding: "0rem",
    },
  },

  title: {
    fontSize: "1.6rem",
    lineHeight: "1",
    fontWeight: "500",
    color: "#395983",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.3rem",
      lineHeight: "1.2",
    },
  },
}));

export const ReportList = () => {
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
      <Grid item xs={12}>
        <Box textAlign="center" className={classes.title}>
          We have found a total of {reports.length} reports:
        </Box>
      </Grid>
      <Grid container style={{ height: "2rem" }} />
      <Grid container spacing={2}>
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
    </>
  );
};
