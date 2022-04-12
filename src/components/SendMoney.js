// import React, { useState } from "react";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Buttons from "./Buttons";

export default function SendMoney({
  senderInfo,
  sendMoney,
  viewUsersList,
  usersList,
  logout,
  accountHolderName,
  getUserProfile,
}) {
  const [transferFormData, setTransferFormData] = useState({
    benAcctNum: "",
    benFullName: "",
    amount: "",
    narration: "",
  });
  // const [buttonContent] = useState(false);
  const [goToDashboard, setGoToDashboard] = useState(false);
  const [accountHolderInfo] = useState(accountHolderName);

  useEffect(() => {
    accountHolderInfo.accountNumber &&
      setTransferFormData((prev) => {
        return {
          ...prev,
          benAcctNum: "0" + accountHolderInfo.accountNumber,
          benFullName: accountHolderInfo.fullName,
        };
      });
  }, [accountHolderInfo]);

  // useEffect(() => {
  //   const list = document.getElementById("usersList");
  //   list.innerHTML = "";
  //   if (usersList.length !== 0) {
  //     usersList.forEach((entry, index) => {
  //       list.innerHTML += `<div key=${index} class="card transactionContainer mb-3" style="width: 18rem">
  //           <ul class="list-group transactionList">
  //             <li class="list-group-item">Name: ${entry.name}</li>
  //             <li class="list-group-item">AccountNumber: 0${entry.accountNumber}</li>
  //           </ul>
  //         </div>`;
  //     });
  //     list.style.display = "block";
  //   } else {
  //     list.style.display = "none";
  //   }
  // }, [usersList]);

  // if (transferFormData.benAcctNum.length === 11) {

  // }

  const handleInputChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;
    if (name === "benAcctNum" || name === "amount") {
      if (value !== "") {
        if (!/^[0-9]+$/.test(value)) {
          return;
        }
        if (value.length >= 11) {
          value = value.slice(0, 11);
        }
      }
    }
    if (transferFormData.benAcctNum.length === 10) {
      getUserProfile({
        benAcctNum: value,
      });
    }
    setTransferFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const TransferMoney = (e) => {
    e.preventDefault();
    if (transferFormData.benAcctNum === "" || transferFormData.amount === "") {
      toast.error("Beneficiary name and amount cannot be empty.", {
        autoClose: 3000,
      });
      return false;
    }
    if (senderInfo.accountBalance < transferFormData.amount) {
      toast.error("Insufficient funds", {
        autoClose: false,
      });
      return false;
    }
    if (transferFormData.benAcctNum.length < 11) {
      toast.error("Account number must be 11 digits", {
        autoClose: false,
      });
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
  // const viewList = () => {
  //   // setButtonContent(!buttonContent);
  //   viewUsersList();
  // };

  return (
    <div className="col-xs-12" id="sendMoney">
      {goToDashboard && <Redirect to="/accoutDashBoard" />}
      <Header handleLogOut={logout} />
      <div id="transferForm">
        <h4>Send Money</h4>
        <form id="form">
          <div className="form-group">
            <label className="label" htmlFor="destinationAccNum">
              Receipient Account Number
            </label>
            <input
              type="text"
              name="benAcctNum"
              className="form-control"
              id="destinationAccNum"
              placeholder="11 digits number"
              value={transferFormData.benAcctNum}
              onChange={handleInputChange}
              required
            />
            <label className="label" htmlFor="destinationAccName">
              Account Holder Name
            </label>
            <input
              type="text"
              name="benFullName"
              className="form-control"
              id="destinationAccName"
              placeholder="Name"
              value={transferFormData.benFullName}
              readOnly
            />
            <label className="label" htmlFor="transferAmount">
              Transfer Amount
            </label>
            <input
              type="text"
              name="amount"
              className="form-control"
              id="transferAmount"
              placeholder="Amount"
              value={transferFormData.amount}
              onChange={handleInputChange}
              required
            />
            <label className="label" htmlFor="transferNarration">
              Description
            </label>
            <input
              type="text"
              name="narration"
              className="form-control"
              id="transferNarration"
              placeholder="Narration"
              value={transferFormData.narration}
              onChange={handleInputChange}
            />
          </div>
          <Buttons
            className="mui-but"
            name="credit"
            value1="Transfer"
            type="submit"
            id="mui_butt1"
            fetchAction={TransferMoney}
          />
        </form>
        <br />
        {/* <Buttons
          styles="mui-but"
          name="credit"
          value1="List all registered users"
          value2="Close"
          type="submit"
          id="mui_butt2"
          buttonContent={buttonContent}
          fetchAction={viewList}
        /> */}
      </div>

      <br />
      {/* <div id="usersList" style={{ display: "none" }}></div> */}
    </div>
  );
}
