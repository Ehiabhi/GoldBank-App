require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mongoose.connect("mongodb://localhost/goldBank", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connect(
  "mongodb+srv://admin-ehis:" +
    process.env.PASSWORD +
    "@cluster0.5p0bt.mongodb.net/goldBank",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.set("useFindAndModify", false);
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
  lastLoggedIn: [
    {
      type: Date,
      require: false,
    },
  ],
  transactionHistory: [
    {
      type: Object,
      require: false,
    },
  ],
  authToken: {
    type: String,
    required: false,
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
        res.statusMessage =
          "User with the same full name exist. Kindly choose another and try agian.";
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
              bcrypt.hash(
                userFormDetail.password,
                saltRounds,
                function (err, hash) {
                  if (err) {
                    console.log(err);
                  }
                  const newAccountHolder = new accountHolder({
                    fullName: userFormDetail.fullName,
                    accountNumber: userFormDetail.contact,
                    gender: userFormDetail.gender,
                    password: hash,
                    accountBalance: 5000,
                    lastLoggedIn: null,
                    authToken: null,
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
              );
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
        res.statusMessage =
          "User with the account number does not exist. Kindly check and try again.";
        return res.status(402).json();
      } else {
        bcrypt.compare(
          userFormDetail.password,
          foundUser.password,
          function (err, result) {
            if (err) {
              console.log(err);
            }
            if (result) {
              generateAuthToken(foundUser).then((genToken) => {
                foundUser.authToken = genToken;
              });
              foundUser.save((err) => {
                if (err) {
                  console.log(
                    "Error while saving user's token to database " + err
                  );
                }
                console.log("User token saved successfully");
                foundUser.password = undefined;
                console.log("Login Successfully");
                return res.status(200).json(foundUser);
              });
            } else {
              console.log("Incorrect login details.");
              throw new Error();
            }
          }
        );
      }
    }
  );
});

app.post("/transfer", (req, res) => {
  const transactionDate = new Date();
  const transferInfo = req.body;
  const receipient = transferInfo.receipient;
  accountHolder.findById(transferInfo.senderId, {}, {}, (err, sender) => {
    if (err) {
      console.log("Error while searching database for sender info. " + err);
    }
    if (!sender) {
      console.log(
        "Ridiculously, sender does not exist or sender information could not be retrieved. Please try again later or contact your bank's customer care center."
      );
    } else {
      if ("0" + sender.accountNumber !== receipient.benAcctNum) {
        sender.accountBalance -= receipient.amount;
      }
      sender.transactionHistory.push({
        Date: "Transaction date: " + transactionDate,
        Type: "Transaction type: Dr",
        AcctNum: "AccountNumber: " + sender.accountNumber,
        Amount: "Amount: #" + receipient.amount,
        Narration: "Narration: " + receipient.narration,
      });
      sender.save((err) => {
        if (err) {
          console.log("Error while saving user's info to database " + err);
        }
        console.log("Transfer successful for sender.");
        accountHolder.findOne(
          { accountNumber: receipient.benAcctNum },
          {},
          {},
          (err, receiver) => {
            if (err) {
              console.log(
                "Error while searching database for recipient info. " + err
              );
            }
            if (!receiver) {
              console.log("No such user exist.");
              sender.accountBalance += Number(receipient.amount);
              sender.save((err) => {
                if (err) {
                  console.log(
                    "Error while saving sender info after withdraw reversal. " +
                      err
                  );
                  return res.status(404).json();
                }
              });
            } else {
              receiver.accountBalance += Number(receipient.amount);
              receiver.transactionHistory.push({
                Date: "Transaction date: " + transactionDate,
                Type: "Transaction type: Cr",
                AcctNum: "AccountNumber: " + receiver.accountNumber,
                Amount: "Amount: #" + receipient.amount,
                Narration: "Narration: " + receipient.narration,
              });
              receiver.save((err) => {
                if (err) {
                  console.log(
                    "Error while saving receipient's info to database " + err
                  );
                }
                console.log("Transfer successful for receipient.");
                if ("0" + sender.accountNumber !== receipient.benAcctNum) {
                  sender.password = undefined;
                  return res.status(200).json(sender);
                } else {
                  receiver.password = undefined;
                  return res.status(200).json(receiver);
                }
              });
            }
          }
        );
      });
    }
  });
});

const generateAuthToken = async (user) => {
  const { accountNumber, password } = user;
  const secret = process.env.AUTH_SECRET;
  const token = await jwt.sign({ accountNumber, password }, secret);
  return token;
};

const authMiddleware = async function (req, res, next) {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const decoded = jwt.verify(token, process.env.secret);
    const result = await pool.query(
      "select b.userid,b.first_name,b.last_name,b.email,t.access_token from bank_user b inner join tokens t on b.userid=t.userid where t.access_token=$1 and t.userid=$2",
      [token, decoded.userid]
    );
    const user = result.rows[0];
    if (user) {
      req.user = user;
      req.token = token;
      next();
    } else {
      throw new Error("Error while authentication");
    }
  } catch (error) {
    res.status(400).send({
      auth_error: "Authentication failed.",
    });
  }
};

let port = process.env.PORT || 3001;
app.listen(port, () => console.log("Server started at port " + port));