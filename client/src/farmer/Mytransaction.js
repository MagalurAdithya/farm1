// import React, { useState, useEffect } from "react";
// import API from "../API";
// import Navbar from "../dashbord/Navbar";

// const UserTransactions = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(false);


//   const fetchTransactions = async () => {
//     setLoading(true);
//     try {
//         const { data } = await API.get("/transaction/my-transactions");
//         console.log(data);

//         const updatedTransactions = data.map(transaction => {
//             if (transaction.status === "pending") {
//                 return { ...transaction, status: "completed" };
//             } else {
//                 return transaction;
//             }
//         });

//         setTransactions(updatedTransactions);
//     } catch (error) {
//         console.error("Error fetching transactions:", error);
//     } finally {
//         setLoading(false);
//     }
// };

  
//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   return (
//     <>
//     <div><Navbar></Navbar></div>
//       <div className="user-transactions">
//         <div  className="dashboard-content">
//           <div className="transactions-title">
//             <h1>My Transactions</h1>
//           </div>
//           {loading ? (
//             <p className="loading-message">Loading transactions...</p>
//           ) : (
//             <div className="transactions-list">
//               {transactions.length > 0 ? (
//                 transactions.map((transaction) => (
//                   <div key={transaction._id} className="transaction-card">
//                     <h2 className="FTh2">Type: {transaction.type}</h2>
//                     <p>
//                       <b>Amount:</b> Rs{" "}
//                       {transaction.amount.toFixed(2)}
//                     </p>
//                     <p>
//                       <b>From:</b> {transaction.from.firstName}{" "}
//                       {transaction.from.lastName}
//                     </p>
                    
//                     <p>
//                       <b>To:</b> {transaction.to.firstName}{" "}
//                       {transaction.to.lastName}
//                     </p>
//                     <p>
//                       <b>Status:</b> {transaction.status}
//                     </p>
//                     <p>
//                       <b>Date:</b>{" "}
//                       {new Date(transaction.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="no-transactions">No transactions found.</p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
  
//     </>
//   );
// };

// export default UserTransactions;


import React, { useState, useEffect } from 'react';
import API from '../API';
// import './UserTransactions.css';
import Navbar from "../dashbord/Navbar"

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await API.get('/transactions/my-transactions', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTransactions(response.data);
    } catch (err) {
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="transactions-page">
      <Navbar UserType={"admin"} />
      <h1 style={{marginTop:"80px"}} className="title">Transactions History</h1>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="loading" style={{ color: 'red' }}>{error}</p>}
      {transactions && transactions.length > 0 ? (
        <div className="transactions-table-container">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Transaction ID</th> 
                <th>Loan Amount</th>
                <th>Interest Rate</th>
                <th>From (Investor)</th>
                <th>To (Farmer)</th>
                <th>Transaction Amount</th>
                <th>Transaction Type</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => {
                const loan = transaction.loan;
                const loanAmount = loan ? loan.amount : 'N/A';
                const interestRate = loan ? loan.interestRate : 'N/A';
                return (
                  <tr key={transaction._id}>
                    <td>{transaction._id}</td> {/* Display the Transaction ID */}
                    <td>{loanAmount}</td>
                    <td>{interestRate}%</td>
                    <td>{transaction.from.firstName} {transaction.from.lastName}</td>
                    <td>{transaction.to.firstName} {transaction.to.lastName}</td>
                    <td>{transaction.amount}</td>
                    <td>
                      <span className={`status ${transaction.type === 'investment' ? 'investment' : 'repayment'}`}>
                        {transaction.type === 'investment' ? 'Investment' : 'Repayment'}
                      </span>
                    </td>
                    <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-transactions-message">No transactions found</p>
      )}
    </div>
  );
};

export default TransactionsPage;
