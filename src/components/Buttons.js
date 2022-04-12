import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "none",
    margin: theme.spacing(1),
    width: "10rem",
    color: "#fff",
    backgroundColor: "#000",
    "&:hover": {
      color: "#000",
      backgroundColor: "#fff",
      fontWeight: "bolder",
    },
  },
}));

function Buttons({
  name,
  fetchAction,
  id,
  buttonContent,
  value1,
  value2,
  type,
}) {
  const classes = useStyles();
  return (
    <Button
      name={name}
      variant="contained"
      className={classes.button}
      onClick={fetchAction}
      type={type}
      id={id && id}
      size="large"
    >
      {!buttonContent ? value1 : value2}
    </Button>
  );
}

export default Buttons;
