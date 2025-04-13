import React, { useState, useEffect } from "react";
import Navbar from "../dashbord/Navbar";
import API from "../API";
import { toast } from "react-toastify";
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import './Repay.css'

const MyLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();


  const fetchLoans = async () => {
    setLoading(true);
    try {
      const response = await API.get("/loans/my-loans");
      setLoans(response.data);
      console.log(response.data)
    } catch (error) {
      toast.error("Failed to load loans");
    } finally {
      setLoading(false);
    }
  };

  const handleRepayment = async (loanId, amount, investorId) => {
    const farmerId = localStorage.getItem("farmerId");
    const confirmed = window.confirm(`Do you want to repay Rs. ${amount}?`);
    if (confirmed) {
      try {
        const response = await API.post(`/loans/${loanId}/repay`, {
          amount,
          fromUserId: farmerId,
          toUserId: investorId,
        });

        if (response.data?.message) {
          toast.success(response.data.message);
          fetchLoans();
          setShowConfetti(true); 
        
          
          setTimeout(() => {
            setShowConfetti(false);
          }, 4000);
        } else {
          toast.error("Unexpected response format.");
        }
      } catch {
        toast.error("Error while repaying amount.");
      }
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <>
      <Navbar UserType={"farmer"} />
      {showConfetti && <Confetti width={width} height={height} />}
      <div className="loans-container">
        <h1 className="loans-title">Repay Loan</h1>

        {loading ? (
          <p>Loading loans...</p>
        ) : loans.length > 0 ? (
          <div className="table-container">
            <table className="loans-table">
              <thead>
                <tr>
                  <th>Investor</th>
                  <th>Loan Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="body11">
                {loans.map((loan) => (
                  <tr key={loan._id}>
                    <td>{loan.investors.length > 0 ? loan.investors[0].investor.firstName : "N/A"}</td>

                    <td>Rs {loan.amount.toLocaleString()}</td>
                    <td>
                      <span className={`status ${loan.status.toLowerCase()}`}>
                        {loan.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="button view-button"
                        onClick={() => setSelectedLoan(loan)}
                      >
                        Repayment Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No loans found.</p>
        )}

        {selectedLoan && (
          <div className="modal-overlay">
            <div className="modal">
              <button
                className="button close-button"
                onClick={() => setSelectedLoan(null)}
              >
                X
              </button>
              <p>
                <b>Loan Amount:</b> Rs {selectedLoan.amount.toLocaleString()}
              </p>
              <p>
                <b>Status:</b> {selectedLoan.status}
              </p>
              <h3>Repayment Schedule:</h3>
              <ul className="repayment-list">
                {selectedLoan.repaymentSchedule.map((payment, index) => (
                  <li key={index} className="repayment-item">
                    <p>
                      <b>Due Date:</b>{" "}
                      {new Date(payment.dueDate).toLocaleDateString()}
                    </p>
                    <p>
                      <b>Amount:</b> Rs {payment.amount.toLocaleString()}
                    </p>
                    <p>
                      <b>Status:</b> {payment.status}
                    </p>
                    {payment.status === "pending" && (
                      <button
                        className="button repay-button"
                        onClick={() =>
                          handleRepayment(
                            selectedLoan._id,
                            payment.amount,
                            selectedLoan.investors[0]?.investor._id
                          )
                        }
                      >
                        Repay
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyLoans;
