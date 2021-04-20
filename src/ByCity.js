import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "./firebase";
import formatDate from "./utils/formatDate";
import { Report } from "./Report";
import { Grid, Box } from "@material-ui/core/";
import StyledLink from "./components/StyledLink";

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

export const ByCity = (props) => {
  const classes = useStyles();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection("reports");

  const city = props.history.location.state.city;

  const getReports = (whichCity) => {
    setLoading(true);

    let query = ref.where("city", "==", whichCity);

    query
      //.orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        if (querySnapshot.empty) {
          setReports("");
        }
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setReports(items);
        setLoading(false);
      });
  };

  useEffect(() => {
    getReports(city);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Grid container spacing={2} className={classes.reportContainer}>
        {reports.length === 0 ? (
          <Box textAlign="center">
            <h1>No reports have been made in {`${city}`}</h1>
          </Box>
        ) : (
          reports.map((report) => (
            <Report
              key={report.id}
              city={report.city}
              date={formatDate(report.date)}
              tags={report.tags}
              title={report.title}
              report={report.report}
            />
          ))
        )}
      </Grid>
      <Grid container style={{ height: "2rem" }} />
      <Box textAlign="center">
        <StyledLink className={classes.title} to="/find-report">
          Go back
        </StyledLink>
      </Box>
    </>
  );
};
