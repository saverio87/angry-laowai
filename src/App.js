import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../src/logo_small.png";
import { Container, Grid, Typography, Box } from "@material-ui/core/";
import { SubmitReport } from "./SubmitReport";
import { Intro } from "./Intro";
import { ReportList } from "./ReportList";
import { Faq } from "./Faq";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({}));

function App() {
  return (
    <>
      <Router>
        <>
          <Header />
          <Box
            textAlign="center"
            style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
          >
            <img src={logo} />
          </Box>
          <Route exact path="/" component={Intro} />
          <Container maxWidth="lg">
            {/* <Alert /> */}
            <Switch>
              <Route exact path="/reports" component={ReportList} />
              <Route exact path="/submit" component={SubmitReport} />
              <Route exact path="/faq" component={Faq} />
            </Switch>
          </Container>
        </>
      </Router>
    </>
  );
}

export default App;
