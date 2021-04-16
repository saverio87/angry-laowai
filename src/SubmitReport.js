import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { cities } from "./utils/cities";
import { reportTags } from "./utils/tags";
import "date-fns";
import MomentUtils from "@date-io/moment";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import DoneIcon from "@material-ui/icons/Done";
import { v4 as uuidv4 } from "uuid";
import firebase from "./firebase";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import {
  Box,
  Divider,
  Card,
  Chip,
  CardActions,
  CardContent,
  Container,
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
  textfield: {
    fontSize: "1.3rem",
  },
  paper: {
    borderRadius: "0rem",
    padding: "2rem",

    [theme.breakpoints.down("sm")]: {
      backgroundColor: "inherit",
      paddingLeft: "0.1rem",
      paddingRight: "0.1rem",
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

  const handleDelete = () => {
    return;
  };

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
      <Container maxWidth="md">
        <form onSubmit={(e) => onSubmit(e)}>
          <Paper variant="outlined" className={classes.paper}>
            <Typography variant="h4">
              <Box textAlign="center" fontFamily="Montserrat" fontWeight="800">
                Submit a report
              </Box>
            </Typography>
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
              variant="outlined"
              placeholder="A title / summary for your report (required*)"
              fullWidth
              margin="normal"
            />

            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <FormControl
                  variant="outlined"
                  className={classes.textfield}
                  fullWidth
                >
                  <Select
                    name="city"
                    value={city}
                    onChange={onChange}
                    style={{ fontSize: "1.3rem" }}
                  >
                    {cities.map((city) =>
                      city.includes("(") ? (
                        <MenuItem disabled value="">
                          {city}
                        </MenuItem>
                      ) : (
                        <MenuItem value={city}>{city}</MenuItem>
                      )
                    )}
                  </Select>
                  <FormHelperText>Where did it happen?</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box textAlign="center">
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                      format="YYYY-MM-DD"
                      inputVariant="outlined"
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
                    style={{
                      fontSize: "1.3rem",
                      height: "2.5rem",
                      borderRadius: "1rem",
                    }}
                    icon={<MoodBadIcon />}
                    label={tag}
                    clickable
                    onClick={() => selectChip(tag)}
                    color="primary"
                    onDelete={handleDelete}
                    deleteIcon={<DoneIcon />}
                    variant={
                      formData.tags.includes(tag) ? "default" : "outlined"
                    }
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
      </Container>
    </>
  );
};
