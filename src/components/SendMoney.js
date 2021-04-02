import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

export default function SendMoney({ senderInfo, sendMoney }) {
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

  const TransferMoney = (e) => {
    e.preventDefault();
    if (senderInfo.accountBalance < transferFormData.amount) {
      alert("Insufficient funds");
      return false;
    }
    const dataToSend = {
      senderId: senderInfo._id,
      receipient: { ...transferFormData },
    };
    const status = sendMoney(dataToSend);
    if (status) {
      toast.success("Transfer Successful");
      setGoToDashboard(true);
    }
  };

  return (
    <>
      {goToDashboard && <Redirect to="/accoutDashBoard" />}
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
