import React, { useState, useEffect } from "react";
import Header from "./Header";
import { greeting } from "./utils";
import { Redirect } from "react-router-dom";
import dateformat from "dateformat";
import Buttons from "./Buttons";

function Dashboard({ info, logout }) {
  const [customerInfo, setCustomerInfo] = useState({
    accountBalance: null,
    accountNumber: null,
    fullName: null,
    gender: null,
    lastloggedIn: null,
    _id: null,
  });
  const [transactionView, setTransactionView] = useState({
    all: false,
    debit: false,
    credit: false,
  });
  const [routeToSendMoney, setRouteToSendMoney] = useState(false);

  useEffect(() => {
    setCustomerInfo(info);
    fetchTransactionHistory("all");
  }, [info]);

  // console.log("Hi");

  const handleSendMoney = () => {
    setRouteToSendMoney(true);
  };

  // create and display transaction table
  const createTable = (tableContentArray) => {
    const table = document.createElement("table");
    table.className = "table";
    table.id = "table";
    table.innerHTML = `<thead>
      <tr id="trow">
        <th>Date</th>
        <th>Type</th>
        <th>Acct. No.</th>
        <th>Amount</th>
        <th>Narration</th>
      </tr>
    </thead>`;
    const tbody = document.createElement("tbody");
    tableContentArray.forEach((entry, index) => {
      tbody.innerHTML += `<tr id="trow" key=${index}>
      <td>${dateformat(entry.Date, "dd/mmm/yyyy HH:MM")}</td>
      <td>${entry.Type}</td>
      <td>0${entry.AcctNum}</td>
      <td>${entry.Amount}</td>
      <td>${entry.Narration}</td>
    </tr>
      `;
    });
    table.appendChild(tbody);
    return table;
  };

  // View all debit transaction history
  const fetchDebitTransaction = (e) => {
    let d = document.getElementById("transactHistory");
    processTransaction(d, "debit", e);
  };
  // View all credit transaction history
  const fetchCreditTransaction = (e) => {
    let c = document.getElementById("transactHistory");
    processTransaction(c, "credit", e);
  };
  // View all transaction history
  const fetchTransactionHistory = (e) => {
    let h = document.getElementById("transactHistory");
    processTransaction(h, "all", e);
  };

  const transactionArray = {
    all: info.transactionHistory,

    debit: info.transactionHistory.filter(
      (entry) => entry.Type === "Transaction type: Dr" || entry.Type === "Dr"
    ),

    credit: info.transactionHistory.filter(
      (entry) => entry.Type === "Transaction type: Cr" || entry.Type === "Cr"
    ),
  };

  const processTransaction = (e1, type, e) => {
    let x = e.currentTarget ? e.currentTarget.name : e;
    if (!transactionView[x]) {
      e1.innerHTML = "";
    }
    if (transactionArray[x].length === 0) {
      if (e1.innerHTML === "") {
        e1.innerHTML = "There are no entries to display.";
      }
    } else {
      if (
        e1.innerHTML === "" ||
        e1.innerHTML === "There are no entries to display."
      ) {
        const h4 = document.createElement("h4");
        h4.innerHTML =
          type === "all"
            ? "Transaction History"
            : type === "credit"
            ? "Credit Transactions"
            : "Debit Transactions";
        e1.appendChild(h4);
        // I used the map method to return a new reversed array since the reverse method was mutating the original array in redux store.
        e1.appendChild(
          createTable(transactionArray[x].map((item) => item).reverse())
        );
      } else {
        return false;
      }
    }
    setTransactionView(() => {
      return {
        all: false,
        debit: false,
        credit: false,
        [x]: true,
      };
    });
  };

  return (
    <div className="col-xs-12" id="dashBoardRow">
      {routeToSendMoney && <Redirect to="/sendMoney" />}
      <Header handleLogOut={logout} />
      <div id="greet" className="col-xs-12">
        <p>
          {greeting()},{" "}
          {customerInfo.fullName && customerInfo.fullName.split(" ")[0]}
        </p>
      </div>
      <div className="col-xs-12">
        <p>
          Acct. No. #<b>0{customerInfo.accountNumber}</b>
        </p>
        <div id="accountBal">
          <p>Account Balance</p>
          <h2>
            <b>=N={customerInfo.accountBalance}</b>
          </h2>
          <Buttons
            name="all"
            value1="Send money"
            fetchAction={handleSendMoney}
          />
        </div>
        <div id="transact">
          <div id="transactHistory"></div>
        </div>
        <footer id="foot">
          <Buttons
            name="all"
            value1="View Statement"
            fetchAction={fetchTransactionHistory}
          />
          <Buttons
            name="debit"
            value1="View Debits"
            fetchAction={fetchDebitTransaction}
          />
          <Buttons
            name="credit"
            value1="View Credits"
            fetchAction={fetchCreditTransaction}
          />
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;
