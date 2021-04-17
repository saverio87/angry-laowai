import React from "react";
import { Container, Box } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  intro: {
    fontSize: "1.3rem",
    color: "#395983",
    fontWeight: "400",
    textAlign: "center",
    fontFamily: "Montserrat",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.1rem",
      textAlign: "center",
      lineHeight: "1.5",
    },
  },
}));

export const Intro = () => {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="md">
        <Box textAlign="justified" className={classes.intro}>
          <p>
            In light of the numerous reports of episodes of harassment that a
            significant number of foreigners has claimed having been subjected
            to in recent times, especially during (and perhaps as a result of)
            the Covid pandemic, we thought it would be helpful to provide
            foreigners with a platform where they can share and report on these
            incidents and warn fellow expats about places, individuals or
            institutions that have made no secret of disliking foreigners, or
            who have engaged in outright threatening / abusive behavior towards
            them.
          </p>

          <p>
            You do not need to sign up in order to submit a report, the only
            thing we ask is that you keep it civil at all times. We would hate
            for our website to defy the purpose for which it was intended, which
            is to help people, instead of creating more polarization.
          </p>
          <p style={{ color: "salmon", fontWeight: "600" }}>
            Racist remarks will not be tolerated at any time and reports
            containing them will be immediately deleted.
          </p>
          <p>
            We do believe, however, that a healthy dose of criticism is perhaps
            the best way to go about raising awareness of this phenomenon. Feel
            free to report your experience as it happened, without trying to
            sound too diplomatic.
          </p>
        </Box>
      </Container>
    </>
  );
};
