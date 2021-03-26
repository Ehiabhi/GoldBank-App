import React, { useState } from "react";
import { updateClientData } from "../redux/actions/actions";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SendMoney({ senderInfo, dispatch }) {
  const [transferFormData, setTransferFormData] = useState({
    benAcctNum: "",
    benFullName: "",
    amount: "",
    narration: "",
  });
  const [goToDashboard, setGoToDashboard] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setTransferFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  const notify = (mess) => toast.success(mess);

  const TransferMoney = async (e) => {
    e.preventDefault();
    if (senderInfo.accountBalance < transferFormData.amount) {
      alert("Insufficient funds");
      return false;
    }
    const dataToSend = {
      senderId: senderInfo._id,
      receipient: { ...transferFormData },
    };

    const response = await fetch("/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (response.ok) {
      notify("Transfer successful");
      console.log("Transfer Successful");
      const info = await response.clone().json(); //Since response.json() can only be consumed once, we use response.clone().json() to make consumption persistent.
      setTimeout(() => {
        setGoToDashboard(true);
      }, 3000);
      console.log(info);
      return dispatch(updateClientData(info));
    } else {
      const message = response.text;
      return new Error(message);
    }
  };

  return (
    <>
      {goToDashboard && <Redirect to="/accoutDashBoard" />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />
      <h1>Gold Bank</h1>
      <h2>Transfer Funds</h2>
      <form>
        <div className="form-group">
          <input
            type="number"
            name="benAcctNum"
            className="form-control"
            placeholder="Destination Account Number"
            value={transferFormData.benAcctNum}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="benFullName"
            className="form-control"
            placeholder="Receipient Account Name"
            value={transferFormData.benFullName}
            readOnly
          />
          <input
            type="number"
            name="amount"
            className="form-control"
            placeholder="Amount to transfer"
            value={transferFormData.amount}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="narration"
            className="form-control"
            placeholder="Narration"
            value={transferFormData.narration}
            onChange={handleInputChange}
          />
        </div>
        <button className="btn btn-primary" onClick={TransferMoney}>
          Transfer
        </button>
      </form>
    </>
  );
}
