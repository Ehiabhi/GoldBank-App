import React, { useEffect, useState } from "react";
import Header from "./Header";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
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

export default function SendMoney({
  senderInfo,
  sendMoney,
  viewUsersList,
  usersList,
  logout,
}) {
  const classes = useStyles();
  const [transferFormData, setTransferFormData] = useState({
    benAcctNum: "",
    benFullName: "",
    amount: "",
    narration: "",
  });
  const [buttonContent, setButtonContent] = useState(false);
  const [goToDashboard, setGoToDashboard] = useState(false);

  useEffect(() => {
    const list = document.getElementById("usersList");
    list.innerHTML = "";
    if (usersList.length !== 0) {
      usersList.forEach((entry, index) => {
        list.innerHTML += `<div key=${index} class="card transactionContainer mb-3" style="width: 18rem">
            <ul class="list-group transactionList">
              <li class="list-group-item">Name: ${entry.name}</li>
              <li class="list-group-item">AccountNumber: 0${entry.accountNumber}</li>
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
    // setButtonContent(!buttonContent);
    viewUsersList();
  };

  return (
    <div className="col-xs-12" id="sendMoney">
      {goToDashboard && <Redirect to="/accoutDashBoard" />}
      <Header handleLogOut={logout} />
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
          <Button
            name="credit"
            variant="contained"
            className={classes.button}
            type="submit"
            onClick={TransferMoney}
            size="large"
          >
            Transfer
          </Button>
        </div>
      </form>
      <br />
      <Button
        name="credit"
        variant="contained"
        className={classes.button}
        onClick={viewList}
        size="large"
      >
        {!buttonContent ? "View All Users" : "Close"}
      </Button>

      <br />
      <div id="usersList" style={{ display: "none" }}></div>
    </div>
  );
}
