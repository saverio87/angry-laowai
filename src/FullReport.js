import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import StyledLink from "./components/StyledLink";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { Link } from "react-router-dom";

import {
  Box,
  Card,
  Chip,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core/";
import formatDate from "./utils/formatDate";

const useStyles = makeStyles((theme) => ({
  root: {},

  background: {
    backgroundColor: "green",
  },

  chip: {
    margin: "0.1rem",
    //fontSize: "1rem",
    //padding: "0.4rem",
  },

  dateLocation: {
    fontSize: "1.2rem",
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

  report: {
    fontSize: "1.2rem",
    lineHeight: "1.3",
    fontWeight: "300",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      lineHeight: "1.5",
    },
  },

  card: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "1rem",
    backgroundColor: "#b0c4de10",
    borderRadius: "0rem",
    //borderWidth: "0.1rem 0rem 0.1rem 0rem",
    borderColor: "gainsboro",
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "inherit",
      padding: "0rem",
      fontSize: "1rem",
      borderWidth: "0.1rem",
      borderColor: "gainsboro",
      borderTopRightRadius: "0.5rem",
      //borderBottomRightRadius: "0.5rem",
    },
  },
}));
export const FullReport = (props) => {
  const classes = useStyles();

  const report = props.history.location.state.report;
  console.log(report);

  return (
    <>
      <Grid item xs={12} md={12} lg={12} xl={12}>
        <Card className={classes.card} variant="outlined">
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12}>
                <Typography component="div">
                  <Box>
                    <StyledLink className={classes.title}>
                      {report.title}
                    </StyledLink>
                  </Box>
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography component="div">
                  <Box className={classes.report}>{report.report}</Box>
                </Typography>
              </Grid>

              <Grid item xs={12} md={9}>
                <Typography>
                  {report.tags.map((tag) => (
                    <Chip
                      color="primary"
                      variant="outlined"
                      className={classes.chip}
                      label={tag}
                    />
                  ))}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3} style={{ textAlign: "right" }}>
                <Typography component="div">
                  <Box style={{ fontSize: "1rem", color: "#395983" }}>
                    <LocationOnIcon fontSize="small" /> {report.city}
                  </Box>
                </Typography>
                <Typography component="div">
                  <Box style={{ fontSize: "1rem", color: "#395983" }}>
                    <CalendarTodayIcon fontSize="small" /> {report.date}
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid container style={{ height: "2rem" }} />
      <Box textAlign="center">
        <StyledLink className={classes.title} to="/reports">
          Go back
        </StyledLink>
      </Box>
      <Grid container style={{ height: "2rem" }} />
    </>
  );
};
