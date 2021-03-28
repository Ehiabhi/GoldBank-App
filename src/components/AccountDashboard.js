import React, { useState, useEffect } from "react";
import { greeting } from "./utils";
import { Redirect } from "react-router-dom";
import dateformat from "dateformat";

export default function Dashboard({ info }) {
  const [customerInfo, setCustomerInfo] = useState({
    accountBalance: null,
    accountNumber: null,
    fullName: null,
    gender: null,
    lastloggedIn: null,
    _id: null,
  });
  const [routeToSendMoney, setRouteToSendMoney] = useState(false);

  useEffect(() => {
    setCustomerInfo(info);
  }, [info]);

  const handleSendMoney = () => {
    setRouteToSendMoney(true);
  };

  const fetchDebitTransaction = () => {
    document.getElementById("transactHistory").style.display = "none";
    document.getElementById("transactHistoryCredit").style.display = "none";

    let d = document.getElementById("transactHistoryDebit");
    d.style.display = "block";
    let debitArray = info.transactionHistory.filter(
      (entry) => entry.Type === "Transaction type: Dr"
    );
    if (debitArray.length === 0) {
      if (d.innerHTML === "") {
        d.innerHTML = "There are no entries to display.";
        return;
      }
      return false;
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
        return;
      } else {
        return false;
      }
    }
  };

  const fetchCreditTransaction = () => {
    document.getElementById("transactHistory").style.display = "none";
    document.getElementById("transactHistoryDebit").style.display = "none";

    let c = document.getElementById("transactHistoryCredit");
    c.style.display = "block";
    let creditArray = info.transactionHistory.filter(
      (entry) => entry.Type === "Transaction type: Cr"
    );
    if (creditArray.length === 0) {
      if (c.innerHTML === "") {
        c.innerHTML = "There are no entries to display.";
        return;
      }
      return false;
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
        return;
      } else {
        return false;
      }
    }
  };

  const fetchTransactionHistory = () => {
    document.getElementById("transactHistoryDebit").style.display = "none";
    document.getElementById("transactHistoryCredit").style.display = "none";

    let h = document.getElementById("transactHistory");
    h.style.display = "block";
    if (info.transactionHistory.length === 0) {
      if (h.innerHTML === "") {
        h.innerHTML = "There are no entries to display.";
        return;
      }
      return false;
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
  };

  return (
    <>
      {routeToSendMoney && <Redirect to="/sendMoney" />}
      <h1>Gold Bank</h1>
      <h2>
        {greeting()}, {customerInfo.fullName}
      </h2>
      {/* <p>
        Last Logged In:{" "}
        <b>{dateformat(customerInfo.lastloggedIn, "dd/mmm/yyyy HH:MM:ss")}</b>
      </p> */}
      <p>
        Account #<b>{customerInfo.accountNumber}</b>
      </p>
      <h3>
        Account Balance: =N= <b>{customerInfo.accountBalance}</b>
      </h3>
      <button className="btn btn-primary" onClick={handleSendMoney}>
        Send Money
      </button>
      <br />
      <br />
      <button className="btn btn-primary" onClick={fetchTransactionHistory}>
        View Account Statement
      </button>
      &nbsp;
      <button className="btn btn-primary" onClick={fetchDebitTransaction}>
        View All Debit Transaction
      </button>
      &nbsp;
      <button className="btn btn-primary" onClick={fetchCreditTransaction}>
        View All Credit Transaction
      </button>
      <br />
      <br />
      <div id="transactHistory"></div>
      <div id="transactHistoryDebit"></div>
      <div id="transactHistoryCredit"></div>
      {/* <button className="btn btn-primary" onClick={handleLogOut}>
        Log out
      </button> */}
    </>
  );
}
