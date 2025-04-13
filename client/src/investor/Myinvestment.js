import React, { useState, useEffect } from "react";
import Investornavbar from "../dashbord/Investornavbar";
import API from "../API";
import './Myinvester.css'

const InvestmentList = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInvestments = async () => {
      setLoading(true);
      try {
        const response = await API.get("/loans/my-investments");
        console.log(response)
        setInvestments(response.data.loans);
      } catch (error) {
        console.error("Error fetching investments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  return (
    <>
      <Investornavbar />
      <div className="div29" style={{marginTop:"60px"}}>
        <div className="div59">
          {loading ? (
            <p className="para22"><b>Loading your Investments...</b></p>
          ) : investments.length > 0 ? (
            <div className="div96">
              {investments.map((investment) => (
                <div key={investment._id} className="div89">
                  <p><b>Name:</b> {investment.farm?.name}</p>
                  <p><b>Location:</b> {investment.farm?.location || "Unknown"}</p>
                  <p><b>Investment Amount:</b> ₹{investment.amount}</p>
                  {/* <p><b>Farmer:</b> {investment.farm?.farmer || "N/A"}</p> */}
                  <p><b>Status:</b> {investment.status || "Pending"}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="para7">No investments found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default InvestmentList;
