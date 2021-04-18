import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Copyright } from "./utils";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

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
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  hmargin: {
    textAlign: "center",
  },
  back: {
    backgroundColor: "rgba(233, 161, 67, 0.836)",
    height: "80%",
    borderRadius: "5px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({ signup }) {
  const classes = useStyles();
  const [signupFormData, setSignupFormData] = useState({
    fullName: "",
    contact: "",
    gender: "",
    password: "",
    confirmPassword: "",
    error: {
      fullName: {
        status: false,
        message: "",
      },
      contact: {
        status: false,
        message: "",
      },
      gender: {
        status: false,
        message: "",
      },
      password: {
        status: false,
        message: "",
      },
      confirmPassword: {
        status: false,
        message: "",
      },
    },
  });
  const [goToLogin, setGoToLogin] = useState(false);

  const signUp = (e) => {
    e.preventDefault();
    if (signupFormData.password !== signupFormData.confirmPassword) {
      setSignupFormData((prevState) => {
        return {
          ...prevState,
          error: {
            ...prevState.error,
            password: { status: true, message: "Passwords do not match" },
          },
        };
      });
      return false;
    }

    const formDataToSubmit = Object.keys(signupFormData);
    const result = formDataToSubmit.filter(
      (input) => signupFormData[input] === ""
    );
    let errorData = {};
    if (result.length !== 0) {
      for (let i = 0; i < result.length; i++) {
        errorData = {
          ...errorData,
          [result[i]]: { status: true, message: "Field cannot be empty" },
        };
      }
      setSignupFormData((prevState) => {
        return {
          ...prevState,
          error: {
            ...prevState.error,
            ...errorData,
          },
        };
      });
      return false;
    }

    signup(signupFormData)
      .then((status) => {
        toast.success("Sign up successful.");
        setGoToLogin(status);
      })
      .catch((err) => {
        let mes = err.message.text;
        let code = err.message.status;
        setSignupFormData((prevState) => {
          if (code === 408) {
            return {
              ...prevState,
              error: {
                ...prevState.error,
                fullName: { status: true, message: mes },
              },
            };
          } else if (code === 409) {
            return {
              ...prevState,
              error: {
                ...prevState.error,
                contact: { status: true, message: mes },
              },
            };
          } else {
            alert(mes);
          }
        });
      });
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSignupFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
        error: {
          fullNameStatus: {
            status: false,
            message: "",
          },
          contact: {
            status: false,
            message: "",
          },
          gender: {
            status: false,
            message: "",
          },
          password: {
            status: false,
            message: "",
          },
          confirmPassword: {
            status: false,
            message: "",
          },
        },
      };
    });
  };

  return (
    <>
      {goToLogin && <Redirect to="/login" />}
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={2} md={3} />
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          className={classes.back}
          component={Paper}
          elevation={6}
          square
        >
          <Grid item xs={false} sm={2} md={3} />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Gold Bank PLC
            </Typography>
            <Typography className={classes.hmargin} component="h2" variant="h6">
              Kindly sign up to own an account with us today.
            </Typography>
            <form onSubmit={signUp} className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="fullName"
                    error={
                      signupFormData.error.fullName
                        ? signupFormData.error.fullName.status
                        : null
                    }
                    helperText={
                      signupFormData.error.fullName
                        ? signupFormData.error.fullName.message
                        : null
                    }
                    type="text"
                    variant="outlined"
                    value={signupFormData.fullName}
                    required
                    fullWidth
                    onChange={handleInputChange}
                    label="Full Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    error={signupFormData.error.contact.status}
                    helperText={signupFormData.error.contact.message}
                    value={signupFormData.contact}
                    type="number"
                    onChange={handleInputChange}
                    required
                    fullWidth
                    label="Phone Number"
                    name="contact"
                    autoComplete="lname"
                  />
                </Grid>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    error={signupFormData.error.gender.status}
                    helperText={signupFormData.error.gender.message}
                    value={signupFormData.gender}
                    onChange={handleInputChange}
                    label="Age"
                  >
                    {/* Used to create a placeholder for the select element. */}
                    <MenuItem value="">
                      <em>Select a gender</em>
                    </MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="undisclosed">Prefer not to say</MenuItem>
                  </Select>
                </FormControl>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    error={signupFormData.error.password.status}
                    helperText={signupFormData.error.password.message}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    value={signupFormData.password}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    error={signupFormData.error.confirmPassword.status}
                    helperText={signupFormData.error.confirmPassword.message}
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    value={signupFormData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
            <Box mt={5}>{Copyright()}</Box>
          </div>
        </Grid>
      </Grid>

      {/* <Container className={classes.back} component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}></div>
      </Container> */}
    </>
  );
}
