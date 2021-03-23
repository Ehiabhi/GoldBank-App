require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dateFormat = require("dateformat");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/goldBank", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("We are connected to DB!");
});

const accountSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountBalance: {
    type: Number,
  },
});

const accountHolder = mongoose.model("accountHolder", accountSchema);

app.post("/signup", (req, res) => {
  const userFormDetail = req.body;
  // Check for existing user full name.
  accountHolder.findOne(
    { fullName: userFormDetail.fullName },
    {},
    {},
    (err, foundDUser) => {
      if (err) {
        console.log("Error while searching for existing username " + err);
      }
      if (foundDUser) {
        console.log(
          "User with the same full name exist. Kindly choose another and try agian."
        );
        return res.status(420).json();
      } else {
        // Check for existing phone number.
        accountHolder.findOne(
          { accountNumber: userFormDetail.contact },
          {},
          {},
          (err, foundUser1) => {
            if (err) {
              console.log(
                "Error while searching for existing user phone number " + err
              );
            }
            if (foundUser1) {
              console.log(
                "User with the same phone number exist. Kindly choose another and try again."
              );
              return res.status(420).json();
            } else {
              const newAccountHolder = new accountHolder({
                fullName: userFormDetail.fullName,
                accountNumber: userFormDetail.contact,
                gender: userFormDetail.gender,
                password: userFormDetail.password,
                accountBalance: 5000,
              });

              newAccountHolder.save((err) => {
                if (err) {
                  console.log(
                    "Error while saving user's info to database " + err
                  );
                }
                console.log("User saved successfully");
                return res.status(200).json();
              });
            }
          }
        );
      }
    }
  );
});

app.post("/login", (req, res) => {
  const userFormDetail = req.body;
  accountHolder.findOne(
    { accountNumber: userFormDetail.accountNumber },
    {},
    {},
    (err, foundUser) => {
      if (err) {
        console.log("Error while searching for existing username " + err);
      }
      if (!foundUser) {
        console.log(
          "User with the account number does not exist. Kindly check and try again."
        );
      } else {
        if (foundUser.password === userFormDetail.password) {
          console.log("Login Successfully");
          return res.status(200).json(foundUser);
        }
      }
    }
  );
});

app.get("/", (req, res) => {
  //
});

app.post("/", (req, res) => {
  //
});

let port = process.env.PORT || 3001;
app.listen(port, () => console.log("Server started at port " + port));
