import React from "react";
import { greeting } from "./utils";

export default function Dashboard({ fullName }) {
  return (
    <>
      <h1>Gold Bank</h1>
      <h2>
        {greeting()}, {fullName}
      </h2>
      <p>
        Last Login <b>Date and Time</b>
      </p>

      <p>
        Account #<b>Account Number</b>
      </p>
      <h3>
        =N= <b>Account Balance</b>
      </h3>
      <a href="/transactionHistory">View Account Statement</a>
    </>
  );
}
