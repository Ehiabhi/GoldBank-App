import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Copyright } from "./utils";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    backgroundImage: "url(./images/goldbanklogo.png)",
    backgroundBlendMode: "multiply",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundColor: "#000000b0",
    padding: "10px",
  },
  image: {
    backgroundRepeat: "no-repeat",
    backgroundColor: "transparent",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  back: {
    backgroundColor: "rgba(233, 161, 67, 0.836)",
    borderRadius: "5px",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "80%",
    // margin: theme.spacing(8, 4),
    borderRadius: "5px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login({ login, history }) {
  const classes = useStyles();
  const [loginFormData, setLoginFormData] = useState({
    accountNumber: "",
    password: "",
    error: {
      acctStatus: false,
      acctMessage: "",
      passwordStatus: false,
      passwordMessage: "",
    },
  });

  const logIn = async (e) => {
    e.preventDefault();
    login(loginFormData)
      .then((status) => {
        if (status.success) {
          history.push("/accoutDashBoard");
          toast.success("Login successful.");
        }
      })
      .catch((err) => {
        let error = new Error();
        error.message = err.message;
        setLoginFormData((prevState) => {
          if (error.message.status === 402) {
            return {
              ...prevState,
              error: {
                ...prevState.error,
                acctStatus: true,
                acctMessage: error.message.text,
              },
            };
          } else if (error.message.status === 403) {
            return {
              ...prevState,
              error: {
                ...prevState.error,
                passwordStatus: true,
                passwordMessage: error.message.text,
              },
            };
          } else {
            alert(error.message.text);
          }
        });
      });
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
        error: {
          acctStatus: false,
          acctMessage: "",
          passwordStatus: false,
          passwordMessage: "",
        },
      };
    });
  };

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          className={classes.back}
          component={Paper}
          elevation={6}
          square
        >
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Gold Bank PLC
            </Typography>
            <Typography component="h2" variant="h6">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={logIn} noValidate>
              <TextField
                type="number"
                // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                error={loginFormData.error.acctStatus}
                helperText={loginFormData.error.acctMessage}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Account/Phone Number"
                name="accountNumber"
                autoComplete="email"
                value={loginFormData.fullName}
                onChange={handleInputChange}
                autoFocus
              />

              <TextField
                variant="outlined"
                margin="normal"
                error={loginFormData.error.passwordStatus}
                helperText={loginFormData.error.passwordMessage}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={handleInputChange}
                value={loginFormData.fullName}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  {/* <Link to={"/signup"}>Sign Up</Link> */}
                  <Link to="/signup" variant="body2">
                    "Don't have an account? Sign Up"
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>{Copyright()}</Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default withRouter(Login);
