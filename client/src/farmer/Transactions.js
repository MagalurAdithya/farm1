import React, { useState, useEffect } from "react";
import API from "../API";
import Navbar from "../dashbord/Navbar";

const UserTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const { data } = await API.get("/transactions/transactions");
            console.log(data);
    
            const updatedTransactions = data.map(transaction => {
                if (transaction.status === "pending") {
                    return { ...transaction, status: "completed" };
                } else {
                    return transaction;
                }
            });
    
            setTransactions(updatedTransactions);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        } finally {
            setLoading(false);
        }
    };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
   <div>
    <div>
    <Navbar></Navbar>
    </div>
    <div className="user-transactions">
        <div style={{marginTop:"100px"}} className="dashboard-content">
          <div className="transactions-title">
            <h1>My Transactions</h1>
          </div>
          {loading ? (
            <p className="loading-message">Loading transactions...</p>
          ) : (
            <div className="transactions-list">
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <div key={transaction._id} className="transaction-card">
                    <h2 className="FTh2">Type: {transaction.type}</h2>
                    <p>
                      <b>Amount:</b> Rs{" "}
                      {transaction.amount.toFixed(2)}
                    </p>
                    <p>
                      <b>From:</b> {transaction.from.firstName}{" "}
                      {transaction.from.lastName}
                    </p>
                    <p>
                      <b>To:</b> {transaction.to.firstName}{" "}
                      {transaction.to.lastName}
                    </p>
                    <p>
                      <b>Status:</b> {transaction.status}
                    </p>
                    <p>
                      <b>Date:</b>{" "}
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="no-transactions">No transactions found.</p>
              )}
            </div>
          )}
        </div>
      </div>
   </div>
  );
};

export default UserTransactions;