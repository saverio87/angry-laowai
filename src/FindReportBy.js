import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import StyledLink from "./components/StyledLink";
import { makeStyles } from "@material-ui/core/styles";
import { cities } from "./utils/cities";
import {
  Box,
  Container,
  Card,
  Chip,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core/";

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

export const FindReportBy = () => {
  const classes = useStyles();

  const [province, setProvince] = useState("");

  const toggleProvince = (prov) => {
    !province ? setProvince(prov) : setProvince("");
  };

  return (
    <>
      <Container maxWidth="md">
        {/* If province is toggled off (empty string), select province */}
        {!province ? (
          <>
            <Grid item xs={12}>
              <Box textAlign="center" className={classes.title}>
                Select the province:
              </Box>
            </Grid>
            <Grid container style={{ height: "2rem" }} />
            <Grid container spacing={2}>
              {cities.map((province) => (
                <Grid item xs="12" md="6" lg="4">
                  <Card className={classes.card} variant="outlined">
                    <CardContent>
                      <Grid item xs={12} md={12}>
                        <Typography component="div">
                          <Box textAlign="center">
                            <StyledLink
                              className={classes.title}
                              onClick={() => toggleProvince(province)}
                            >
                              {province.province}
                            </StyledLink>
                          </Box>
                        </Typography>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Grid container style={{ height: "3rem" }} />
          </>
        ) : (
          <>
            {/* If province is  toggled on (string value), select city */}
            <Grid item xs={12}>
              <Box textAlign="center" className={classes.title}>
                Select the city:
              </Box>
            </Grid>
            <Grid container style={{ height: "2rem" }} />
            <Grid container spacing={2}>
              {province.cities.map((city) => (
                <Grid item xs="12" md="6" lg="4">
                  <Card className={classes.card} variant="outlined">
                    <CardContent>
                      <Grid item xs={12} md={12}>
                        <Typography component="div">
                          <Box textAlign="center">
                            <StyledLink
                              className={classes.title}
                              to={{
                                pathname: "/filter-city",
                                state: { city: city },
                              }}
                              city={city}
                            >
                              {city}
                            </StyledLink>
                          </Box>
                        </Typography>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Grid container style={{ height: "3rem" }} />
            <Box textAlign="center">
              <StyledLink className={classes.title} onClick={toggleProvince}>
                Go back
              </StyledLink>
            </Box>
            <Grid container style={{ height: "3rem" }} />
          </>
        )}
      </Container>
    </>
  );
};
