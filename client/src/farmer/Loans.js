import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../dashbord/Navbar";
import API from "../API";
import { toast } from "react-toastify";
import './Loans.css'

const Loans = () => {
  const { farmId } = useParams();
  const navigate = useNavigate();
  const [loanData, setLoanData] = useState({
    name:"",
    amount: "",
    interestRate: "",
    duration: "",
  });

  useEffect(() => {
    console.log("Farm ID from useParams:", farmId);
  }, [farmId]);

  const handleChange = (e) => {
    setLoanData({ ...loanData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/loans", {
        farmId,
        ...loanData,
      });

      toast.success("Loan request submitted successfully!");
      navigate("/farmerdashbord");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting loan request");
    }
  };

  return (
   <div>
    <div>
      <Navbar></Navbar>
    </div>
    <div className="body1">
    <div style={{ marginTop: "90px" }} className="loan-request-form-container">
        <h2>Request a Loan for Farm ID <b style={{color:"#ffffff00"}}>{farmId}</b></h2>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="name"
            placeholder="name"
            value={loanData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Loan Amount"
            value={loanData.amount}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="interestRate"
            placeholder="Interest Rate (%)"
            value={loanData.interestRate}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="duration"
            placeholder="Duration (months)"
            value={loanData.duration}
            onChange={handleChange}
            required
          />
          <button type="submit">Request Loan</button>
        </form>
      </div>
    </div>
   </div>
  );
};

export default Loans;

