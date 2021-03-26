import React, { useState, useEffect } from "react";
import { greeting } from "./utils";
import { Redirect } from "react-router-dom";
// import dateformat from "dateformat";

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
      {/* <a className="btn btn-primary" href="/transactionHistory">
        View Account Statement
      </a> */}
      <br />
      <br />
      {/* <button className="btn btn-primary" onClick={handleLogOut}>
        Log out
      </button> */}
    </>
  );
}
