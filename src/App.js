import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography, Box } from "@material-ui/core/";
import { SubmitReport } from "./SubmitReport";
import { Intro } from "./Intro";
import { ReportList } from "./ReportList";
import { Faq } from "./Faq";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { FindReportBy } from "./FindReportBy";
import { ByCity } from "./ByCity";
import { FullReport } from "./FullReport";

const useStyles = makeStyles((theme) => ({}));

function App() {
  return (
    <>
      <Router>
        <>
          <Header />

          <Route exact path="/" component={Intro} />
          <Container maxWidth="lg">
            <Grid container style={{ height: "2rem" }} />
            {/* <Alert /> */}
            <Switch>
              <Route exact path="/reports" component={ReportList} />
              <Route exact path="/report" component={FullReport} />
              <Route exact path="/submit" component={SubmitReport} />
              <Route exact path="/find-report" component={FindReportBy} />
              <Route exact path="/filter-city" component={ByCity} />
              <Route exact path="/faq" component={Faq} />
            </Switch>
          </Container>
        </>
      </Router>
    </>
  );
}

export default App;
