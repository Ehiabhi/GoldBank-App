import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

export default function SendMoney({
  senderInfo,
  sendMoney,
  viewUsersList,
  usersList,
}) {
  const [transferFormData, setTransferFormData] = useState({
    benAcctNum: "",
    benFullName: "",
    amount: "",
    narration: "",
  });
  const [goToDashboard, setGoToDashboard] = useState(false);

  useEffect(() => {
    const list = document.getElementById("usersList");
    list.innerHTML = "";
    if (usersList.length !== 0) {
      usersList.forEach((entry, index) => {
        list.innerHTML += `<div key=${index} class="card transactionContainer mb-3" style="width: 18rem">
            <ul class="list-group transactionList">
              <li class="list-group-item">Name: ${entry.name}</li>
              <li class="list-group-item">AccountNumber: ${entry.accountNumber}</li>
            </ul>
          </div>
          `;
      });
      list.style.display = "block";
    } else {
      list.style.display = "none";
    }
  }, [usersList]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setTransferFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const TransferMoney = (e) => {
    e.preventDefault();
    if (transferFormData.benAcctNum === "" || transferFormData.amount === "") {
      toast.error("Beneficiary name and amount cannot be empty.", {
        autoClose: 6000,
      });
      return false;
    }
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

  const viewList = () => {
    viewUsersList();
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
        <div className="action-items">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={TransferMoney}
          >
            Transfer
          </button>
        </div>
      </form>
      <br />
      <button className="btn btn-outline-primary" onClick={viewList}>
        View List of Registered Users
      </button>
      <br />
      <div id="usersList" style={{ display: "none" }}></div>
    </>
  );
}
