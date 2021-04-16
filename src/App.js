import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../src/logo_small.png";
import { Container, Grid, Typography, Box } from "@material-ui/core/";
import { SubmitReport } from "./SubmitReport";
import { Intro } from "./Intro";
import { ReportList } from "./ReportList";

const useStyles = makeStyles((theme) => ({}));

function App() {
  return (
    <>
      <Header />
      <Box textAlign="center" style={{ padding: "2rem" }}>
        <img src={logo} />
      </Box>

      <Intro />

      <ReportList />

      <Grid container style={{ height: "2rem" }} />

      <SubmitReport />

      <Grid container style={{ height: "2rem" }} />
    </>
  );
}

export default App;
