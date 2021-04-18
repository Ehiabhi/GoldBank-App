import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Header from "./Header";
import { greeting } from "./utils";
import { Redirect } from "react-router-dom";
import dateformat from "dateformat";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    width: "10rem",
    color: "#ff0080",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#ff0080",
    },
  },
}));

function Dashboard({ info, logout }) {
  const classes = useStyles();
  const [customerInfo, setCustomerInfo] = useState({
    accountBalance: null,
    accountNumber: null,
    fullName: null,
    gender: null,
    lastloggedIn: null,
    _id: null,
  });
  const [buttonContent, setButtonContent] = useState({
    all: false,
    debit: false,
    credit: false,
  });
  const [routeToSendMoney, setRouteToSendMoney] = useState(false);

  useEffect(() => {
    setCustomerInfo(info);
  }, [info]);

  const handleSendMoney = () => {
    setRouteToSendMoney(true);
  };

  const closeStatement = (e) => {
    const name = e.currentTarget.name;
    switch (name) {
      case "all":
        setButtonContent((prevState) => {
          return { ...prevState, all: !prevState.all };
        });
        return;

      case "credit":
        setButtonContent((prevState) => {
          return { ...prevState, credit: !prevState.credit };
        });
        return;

      case "debit":
        setButtonContent((prevState) => {
          return { ...prevState, debit: !prevState.debit };
        });
        return;

      default:
        return null;
    }
  };

  const fetchDebitTransaction = (e) => {
    let d = document.getElementById("transactHistoryDebit");
    if (!buttonContent.debit) {
      document.getElementById("transactHistory").style.display = "none";
      document.getElementById("transactHistoryCredit").style.display = "none";

      d.style.display = "block";
      let debitArray = info.transactionHistory.filter(
        (entry) => entry.Type === "Transaction type: Dr"
      );
      if (debitArray.length === 0) {
        if (d.innerHTML === "") {
          d.innerHTML = "There are no entries to display.";
        }
      } else {
        if (
          d.innerHTML === "" ||
          d.innerHTML === "There are no entries to display."
        ) {
          const h2 = document.createElement("h2");
          h2.innerHTML = "Debit Transactions";
          d.appendChild(h2);
          debitArray.forEach((entry, index) => {
            d.innerHTML += `<div key=${index} class="card transactionContainer mb-3" style="width: 18rem">
                <ul class="list-group transactionList">
                  <li class="list-group-item">${dateformat(
                    entry.Date,
                    "dd/mmm/yyyy HH:MM"
                  )}</li>
                  <li class="list-group-item">${entry.Type}</li>
                  <li class="list-group-item">${entry.AcctNum}</li>
                  <li class="list-group-item">${entry.Amount}</li>
                  <li class="list-group-item">${entry.Narration}</li>
                </ul>
              </div>
              `;
          });
        } else {
          return false;
        }
      }
    } else {
      d.innerHTML = "";
    }
    closeStatement(e);
  };

  const fetchCreditTransaction = (e) => {
    let c = document.getElementById("transactHistoryCredit");
    if (!buttonContent.credit) {
      document.getElementById("transactHistory").style.display = "none";
      document.getElementById("transactHistoryDebit").style.display = "none";

      c.style.display = "block";
      let creditArray = info.transactionHistory.filter(
        (entry) => entry.Type === "Transaction type: Cr"
      );
      if (creditArray.length === 0) {
        if (c.innerHTML === "") {
          c.innerHTML = "There are no entries to display.";
        }
      } else {
        if (
          c.innerHTML === "" ||
          c.innerHTML === "There are no entries to display."
        ) {
          const h2 = document.createElement("h2");
          h2.innerHTML = "Credit Transactions";
          c.appendChild(h2);
          creditArray.forEach((entry, index) => {
            c.innerHTML += `<div key=${index} class="card transactionContainer mb-3" style="width: 18rem">
                <ul class="list-group transactionList">
                  <li class="list-group-item">${dateformat(
                    entry.Date,
                    "dd/mmm/yyyy HH:MM"
                  )}</li>
                  <li class="list-group-item">${entry.Type}</li>
                  <li class="list-group-item">${entry.AcctNum}</li>
                  <li class="list-group-item">${entry.Amount}</li>
                  <li class="list-group-item">${entry.Narration}</li>
                </ul>
              </div>
              `;
          });
        } else {
          return false;
        }
      }
    } else {
      c.innerHTML = "";
    }
    closeStatement(e);
  };

  const fetchTransactionHistory = (e) => {
    let h = document.getElementById("transactHistory");
    if (!buttonContent.all) {
      document.getElementById("transactHistoryDebit").style.display = "none";
      document.getElementById("transactHistoryCredit").style.display = "none";
      h.style.display = "block";
      if (info.transactionHistory.length === 0) {
        if (h.innerHTML === "") {
          h.innerHTML = "There are no entries to display.";
        }
      } else {
        if (
          h.innerHTML === "" ||
          h.innerHTML === "There are no entries to display."
        ) {
          const h2 = document.createElement("h2");
          h2.innerHTML = "Transaction History";
          h.appendChild(h2);
          info.transactionHistory.forEach((entry, index) => {
            h.innerHTML += `<div key=${index} class="card transactionContainer mb-3" style="width: 18rem">
                <ul class="list-group transactionList">
                  <li class="list-group-item">${dateformat(
                    entry.Date,
                    "dd/mmm/yyyy HH:MM"
                  )}</li>
                  <li class="list-group-item">${entry.Type}</li>
                  <li class="list-group-item">${entry.AcctNum}</li>
                  <li class="list-group-item">${entry.Amount}</li>
                  <li class="list-group-item">${entry.Narration}</li>
                </ul>
              </div>
              `;
          });
          return;
        } else {
          return false;
        }
      }
    } else {
      h.innerHTML = "";
    }
    closeStatement(e);
  };

  return (
    <div className="col-xs-12" id="dashBoardRow">
      {routeToSendMoney && <Redirect to="/sendMoney" />}
      <Header handleLogOut={logout} />
      <div className="col-xs-12">
        <h2>
          {greeting()},{" "}
          {customerInfo.fullName && customerInfo.fullName.split(" ")[0]}
        </h2>
      </div>
      <div className="col-xs-12">
        <p>
          Account No. #<b>0{customerInfo.accountNumber}</b>
        </p>
        <h3>
          Account Balance: =N= <b>{customerInfo.accountBalance}</b>
        </h3>
        <Button
          name="all"
          variant="contained"
          className={classes.button}
          onClick={handleSendMoney}
          size="large"
        >
          Send Money
        </Button>
        <br />
        <br />
        <Button
          name="all"
          variant="contained"
          className={classes.button}
          onClick={fetchTransactionHistory}
          size="large"
        >
          {!buttonContent.all ? "View Statement" : "Close"}
        </Button>
        <Button
          name="debit"
          variant="contained"
          className={classes.button}
          onClick={fetchDebitTransaction}
          size="large"
        >
          {!buttonContent.debit ? "View Debits" : "Close"}
        </Button>
        <Button
          name="credit"
          variant="contained"
          className={classes.button}
          onClick={fetchCreditTransaction}
          size="large"
        >
          {!buttonContent.credit ? "View Credits" : "Close"}
        </Button>
        <br />
        <br />
        <div id="transactHistory"></div>
        <div id="transactHistoryDebit"></div>
        <div id="transactHistoryCredit"></div>
      </div>
    </div>
  );
}

export default Dashboard;
