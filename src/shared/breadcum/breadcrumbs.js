import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import { Route, Link as RouterLink } from "react-router-dom";
// import { Route, BrowserRouter as Router, MemoryRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  typo: {
    color: "darkgray",
  },
}));
export default function SimpleBreadcrumbs() {
  const classes = useStyles();
  return (
    <Route>
      {({ location }) => {
        const pathnames = location.pathname.split("/").filter((x) => x);
        return (
          <Breadcrumbs aria-label="Breadcrumb" className={classes.typo}>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = window.location.pathname;
              return last ? (
                <Typography className={classes.typo} key={to}>
                  {`/${value}`}
                </Typography>
              ) : (
                <RouterLink className={classes.typo} to={to} key={to}>
                  {value}
                </RouterLink>
              );
            })}
          </Breadcrumbs>
        );
      }}
    </Route>
  );
}
