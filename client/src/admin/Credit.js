import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../API";
import Navbaradmin from "../dashbord/Navbaradmin";

const AdminVerifyInvestments = () => {
  const [pendingLoans, setPendingLoans] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPendingLoans = async () => {
    setLoading(true);
    try {
      const response = await API.get("/loans/loans/pending-approval");
      setPendingLoans(response.data.loans); 
      console.log(response)
    } catch (error) {
      console.error("Error fetching pending loans:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const verifyInvestment = async (loanId, investorId,farmerId,) => {
    try {
      // if(!investorId){
      //   toast.error("No investor found")
      // }
      await API.put(`/admin/credit/${loanId}/verify`, {
        loanId: loanId,
        investorId: investorId,
        farmerId: farmerId,
      });
    
      toast.success("Investment verified successfully!");
      getPendingLoans(); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Error verifying investment");
    }
  };



  const creditInvestment = async (loanId, investorId, farmerId, loanAmount) => {
    if (!loanId || !investorId || !farmerId || !loanAmount) {
      toast.error("Missing required data to credit investment");
      return;
    }
  
    try {
      const response = await API.post(
        `/loans/credit/${loanId}`,
        {
          amount: loanAmount,   
          fromUserId: investorId, 
          toUserId: farmerId,
        },
        { headers: { "Content-Type": "application/json" } }
      );
  
      console.log("API Response:", response.data);
      toast.success("Investment credited successfully!");
      getPendingLoans();
    } catch (error) {
      console.error("API Error:", error.response?.data);
      toast.error(error.response?.data?.message || "Error crediting investment");
    }
  };
  

  useEffect(() => {
    getPendingLoans();
  }, []);

  return (
    <div>
      <div>
        <Navbaradmin></Navbaradmin>
      </div>
      <div>
      <div className="dashboard-container">
    {loading ? (
      <p>Loading pending loans...</p>
    ) : (
      <div className="loan-list">
        {pendingLoans.length > 0 ? (
          pendingLoans.map((loan) => (
            <div key={loan._id} className="loan-item">
              {/* <h3>{loan.farm.name}</h3> */}
              <p><b>Name:</b> {loan.name}</p>
              <p><b>Status:</b> {loan.status}</p>
              <p><b>Amount:</b> {loan.amount}</p>
              <p><b>Requested Interest Rate:</b> {loan.interestRate}</p>
              <p><b>Duration:</b> {loan.duration}</p>

              {/* <button   
                onClick={() => verifyInvestment(loan._id, loan.investors[0].investor,loan.farm.farmer,loan.amount)} 
              >
                Verify Investment
              </button> */}
              <button 
  onClick={() => {
    if (!loan.investors || loan.investors.length === 0) {
      toast.error("No investors found for this loan");
      return;
    }
    
    verifyInvestment(loan._id, loan.investors[0]?.investor, loan.farm?.farmer);
  }}
>
  Verify Investment
</button>
<button 
  className="credit"
  onClick={() => {
    console.log("Loan ID:", loan._id);
    console.log("Investor ID:", loan.investors[0]?.investor);
    console.log("Farmer ID:", loan.farm?.farmer);
    console.log("Loan Amount:", loan.amount); 

    creditInvestment(loan._id, loan.investors[0]?.investor, loan.farm?.farmer, loan.amount);
  }}
  disabled={loan.status === "credited"}
>
  Credit Investment
</button>

            </div>
          ))
        ) : (
          <p>No pending loans found.</p>
        )}
      </div>
    )}
  </div>
      </div>
    </div>
  );
};

export default AdminVerifyInvestments;