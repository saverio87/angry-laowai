import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { cities, citiesArray } from "./utils/cities";
import { reportTags } from "./utils/tags";
import "date-fns";
import MomentUtils from "@date-io/moment";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import { v4 as uuidv4 } from "uuid";
import firebase from "./firebase";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import {
  Box,
  Chip,
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
  Grid,
  Button,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    fontSize: "2rem",
    lineHeight: "1",
    fontWeight: "800",
    color: "#395983",
    fontFamily: "Montserrat",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
      lineHeight: "1.2",
    },
  },

  chip: {
    height: "2rem",
    fontSize: "1.3rem",
    borderRadius: "0rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  textfield: {
    fontSize: "1.2rem",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  paper: {
    borderRadius: "0rem",
    padding: "2rem",
    backgroundColor: "#b0c4de10",
    //borderWidth: "0.1rem 0rem 0.1rem 0rem",
    borderColor: "gainsboro",

    [theme.breakpoints.down("sm")]: {
      backgroundColor: "inherit",
      padding: "0.1rem",
      border: "0rem",
    },
  },
}));

const initialState = {
  title: "",
  tags: [],
  city: "",
  date: new Date(),
  report: "",
};

export const SubmitReport = () => {
  const classes = useStyles();

  // STATES

  const [formData, setFormData] = useState(initialState);
  const { title, city, date, tags, report } = formData;

  const ref = firebase.firestore().collection("reports");

  // <>
  //     <MenuItem disabled value="">
  //       {item.province}
  //     </MenuItem>
  //     {item.cities.map((city) => (
  //       <MenuItem value={city}>{city}</MenuItem>
  //     ))}
  //   </>

  // city.includes("(") ? (
  //   <MenuItem disabled value="">
  //     {city}
  //   </MenuItem>
  // ) : (
  //   <MenuItem value={city}>{city}</MenuItem>
  // )

  // SET FORM DATA FUNCTIONS

  const selectChip = (tag) => {
    setFormData({
      ...formData,
      tags: tags.includes(tag)
        ? tags.filter((item) => item !== tag)
        : [...tags, tag],
    });
  };

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date._d,
    });
  };

  // ADD REPORT and SUBMIT

  const onSubmit = (e) => {
    e.preventDefault();
    addReport({ ...formData });
    setFormData(initialState);
  };

  const addReport = (newReport) => {
    ref
      .doc(newReport.id)
      .set(newReport)
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Grid item xs={12}>
        <Box textAlign="center" className={classes.title}>
          Submit a report
        </Box>
      </Grid>
      <Grid container style={{ height: "2rem" }} />
      <form onSubmit={(e) => onSubmit(e)}>
        <Paper variant="outlined" className={classes.paper}>
          <TextField
            InputProps={{
              classes: {
                root: classes.textfield,
              },
            }}
            required
            name="title"
            value={title}
            onChange={onChange}
            label=""
            placeholder="A title or summary for your report *"
            fullWidth
            margin="normal"
          />

          <Grid container spacing={1}>
            <Grid item xs={12} md={6} style={{ paddingTop: "1.2rem" }}>
              <FormControl
                // variant="outlined"
                className={classes.textfield}
                fullWidth
              >
                <Select
                  name="city"
                  value={city}
                  onChange={onChange}
                  className={classes.textfield}
                >
                  {citiesArray.map((city) =>
                    city.includes("(") ? (
                      <MenuItem disabled value="">
                        {city.slice(0, -3)}
                      </MenuItem>
                    ) : (
                      <MenuItem value={city}>{city}</MenuItem>
                    )
                  )}
                </Select>
                <FormHelperText>Where did it happen?</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} style={{ paddingTop: "1.2rem" }}>
              <Box textAlign="center">
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    format="YYYY-MM-DD"
                    // inputVariant="outlined"
                    helperText={"When did it happen?"}
                    fullWidth
                    InputProps={{
                      classes: {
                        root: classes.textfield,
                      },
                    }}
                    value={date}
                    onChange={handleDateChange}
                  />
                </MuiPickersUtilsProvider>
              </Box>
            </Grid>
          </Grid>

          <Grid container style={{ height: "1rem" }} />

          <Grid container spacing={1} justify="center">
            {reportTags.map((tag) => (
              <Box textAlign="center" style={{ padding: "0.2rem" }}>
                <Chip
                  component="inherit"
                  className={classes.chip}
                  icon={<MoodBadIcon />}
                  label={tag}
                  clickable
                  onClick={() => selectChip(tag)}
                  color="primary"
                  variant={formData.tags.includes(tag) ? "default" : "outlined"}
                />
              </Box>
            ))}
          </Grid>

          <Grid container style={{ height: "1rem" }} />

          <TextField
            InputProps={{
              classes: {
                root: classes.textfield,
              },
            }}
            required
            fullWidth
            name="report"
            label="Report"
            value={report}
            onChange={onChange}
            placeholder="Tell us what happened"
            multiline
            rows={10}
            variant="outlined"
          />
          <Grid container style={{ height: "1rem" }} />
          <Box textAlign="center">
            <Button
              type="submit"
              variant="outlined"
              style={{ borderRadius: "1.5rem" }}
              size="large"
              color="primary"
              className={classes.button}
            >
              Send report
            </Button>
          </Box>
        </Paper>
      </form>
      <Grid container style={{ height: "2rem" }} />
    </>
  );
};
