// import React, { useState, useEffect } from "react";
// import Investerdashbord from "../dashbord/Investerdashbord";
// import API from "../API";
// import { toast } from "react-toastify";
// import'./Available.css'



// const InvestorFeed = () => {
//   const [loans, setLoans] = useState([]);
//   const [investorId, setInvestorId] = useState("");
//   const [loading, setLoading] = useState(false);


//   const getLoans = async () => {
//     setLoading(true);
//     try {
//       const response = await API.get("/loans/available");
//       console.log(response)

//       if (response.data && response.data.loans) {
//         setLoans(response.data.loans);
//         setInvestorId(response.data.investorId || "");
//       } else {
//         console.warn("Invalid API response format:", response.data);
//         setLoans([]);
//       }
//     } catch (error) {
//       console.error("Error fetching loans:", error);
//       toast.error("Failed to fetch loans");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getLoans();
//   }, []);

  
//   const acceptLoanRequest = async (loanAmount, loanId, farmerId, isVerified) => {
//     if (!investorId) {
//       toast.error("Investor ID not found!");
//       return;
//     }
//     if (!farmerId) {
//       toast.error("Farmer ID is missing. Unable to process the loan.");
//       return;
//     }
//     // if (!isVerified) {
//     //   toast.error("Loan is not approved by the admin.");
//     //   return;
//     // }


//     try {
//       await API.post(`/loans/${loanId}/invest`, {
//         amount: loanAmount,
//         toUserId: farmerId,
//         fromUserId: investorId,
//         status: "Pending Approval",
//       });
//       toast.success("Loan successful");
//       getLoans(); 
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error submitting loan request");
//     }
//   };

//   return (
//    <div>
//     <div>
//      <Investerdashbord></Investerdashbord>
//     </div>
//     <div>
//     <div >
//         <h1 style={{ textAlign: "center", marginTop: "20px" }}>Available Loans</h1>

//         {loading ? (
//           <p><b>Loading loan requests...</b></p>
//         ) : (
//           <div>
//             {loans.length > 0 ? (
//               loans.map((loan) => (
//                 <div key={loan._id} >
//                   <h2><b>Status:</b> {loan?.status || "Unknown"}</h2>
//                   <p><b>Name:</b> {loan?.name||"N/A"}</p>
//                   <p><b>Amount:</b> Rs {loan?.amount?.toLocaleString()}</p>
//                   <p><b>Requested Interest Rate:</b> {loan?.interestRate || "N/A"}</p>
//                   <p><b>Duration:</b> {loan?.duration || "N/A"}</p>
                  
//                   <button
                   
//                     onClick={() => acceptLoanRequest(
//                       loan.amount,
//                       loan._id,
//                       loan.farm?.farmer || "",
//                       loan.isVerified
//                     )}
//                   >
//                     Accept Loan
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p>No farms available to fund.</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//    </div>
//   );
// };

// export default InvestorFeed;



import React, { useState, useEffect } from "react";
import Investerdashbord from "../dashbord/Investerdashbord";
import API from "../API";
import { toast } from "react-toastify";
import './Available.css';

const InvestorFeed = () => {
  const [loans, setLoans] = useState([]);
  const [investorId, setInvestorId] = useState("");
  const [loading, setLoading] = useState(false);

  const getLoans = async () => {
    setLoading(true);
    try {
      const response = await API.get("/loans/available");
      console.log(response);

      if (response.data && response.data.loans) {
        setLoans(response.data.loans);
        setInvestorId(response.data.investorId || "");
      } else {
        console.warn("Invalid API response format:", response.data);
        setLoans([]);
      }
    } catch (error) {
      console.error("Error fetching loans:", error);
      toast.error("Failed to fetch loans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLoans();
  }, []);

  const acceptLoanRequest = async (loanAmount, loanId, farmerId, isVerified) => {
    if (!investorId) {
      toast.error("Investor ID not found!");
      return;
    }
    if (!farmerId) {
      toast.error("Farmer ID is missing. Unable to process the loan.");
      return;
    }

    try {
      await API.post(`/loans/${loanId}/invest`, {
        amount: loanAmount,
        toUserId: farmerId,
        fromUserId: investorId,
        status: "Pending Approval",
      });
      toast.success("Loan successful");
      getLoans(); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting loan request");
    }
  };

  return (
    <div>
      <Investerdashbord />
      <div className="loan-container" style={{marginTop:"60px"}}>
        <h1 className="heading">Available Loans</h1>
        {loading ? (
          <p><b>Loading loan requests...</b></p>
        ) : (
          <div className="loan-grid">
            {loans.length > 0 ? (
              loans.map((loan) => (
                <div key={loan._id} className="loan-cards">
                  <h2><b>Status:</b> {loan?.status || "Unknown"}</h2>
                  <p><b>Name:</b> {loan?.name || "N/A"}</p>
                  <p><b>Amount:</b> Rs {loan?.amount?.toLocaleString()}</p>
                  <p><b>Requested Interest Rate:</b> {loan?.interestRate || "N/A"}</p>
                  <p><b>Duration:</b> {loan?.duration || "N/A"}</p>
                  
                  <button
                    onClick={() =>
                      acceptLoanRequest(
                        loan.amount,
                        loan._id,
                        loan.farm?.farmer || "",
                        loan.isVerified
                      )
                    }
                  >
                    Accept Loan
                  </button>
                </div>
              ))
            ) : (
              <p>No farms available to fund.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorFeed;

