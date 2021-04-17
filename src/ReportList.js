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
      <Grid container spacing={2} className={classes.reportContainer}>
        {reports.map((report) => (
          <Report
            key={report.id}
            city={report.city}
            date={formatDate(report.date)}
            tags={report.tags}
            title={report.title}
            report={
              report.report.length > 150
                ? `${report.report.slice(0, 150)} ...`
                : report.report
            }
          />
        ))}
      </Grid>
    </>
  );
};
