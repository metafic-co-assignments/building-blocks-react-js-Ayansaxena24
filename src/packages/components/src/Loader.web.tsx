import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

interface myProps {
  loading: boolean;
}

const useStyles = makeStyles(() => ({
  root: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgb(0, 0, 0, .4)",
    zIndex: 1,
  },
  circularContainer: {
    position: "absolute",
    left: "50%",
    top: "40%",
    transform: "translate(-50%, -50%)",
  },
}));

export default function Loader(props: myProps) {
  const classes = useStyles();
  return props.loading ? (
    <div className={classes.root}>
      <div className={classes.circularContainer}>
        <CircularProgress />
      </div>
    </div>
  ) : (
    <div />
  );
}
