import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
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
    fontSize: "1.8rem",
    lineHeight: "1.3",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
      lineHeight: "1.2",
    },
  },

  report: {
    fontSize: "1.2rem",
    fontWeight: "300",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      lineHeight: "1.3",
    },
  },

  card: {
    width: "95%",
    borderRadius: "0rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    backgroundColor: "white",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      borderRadius: "0rem",

      backgroundColor: "inherit",
      paddingLeft: "0rem",
      paddingRight: "0rem",
      fontSize: "1rem",
    },
  },
}));

export const Report = ({ city, date, title, tags, report }) => {
  const classes = useStyles();

  return (
    <>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        xl={12}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card className={classes.card} variant="outlined">
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12}></Grid>
              <Grid item xs={12} md={12}>
                <Typography component="div">
                  <Box className={classes.title}>{title}</Box>
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography component="div">
                  <Box className={classes.report}>{report}</Box>
                </Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography>
                  {tags.map((tag) => (
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
                <Typography component="div" color="textSecondary">
                  <Box style={{ fontSize: "1rem" }}>
                    <LocationOnIcon fontSize="small" /> {city}
                  </Box>
                </Typography>
                <Typography component="div" color="textSecondary">
                  <Box style={{ fontSize: "1rem" }}>
                    <CalendarTodayIcon fontSize="small" /> {date}
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};
