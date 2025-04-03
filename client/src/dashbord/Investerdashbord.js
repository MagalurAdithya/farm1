//import { useEffect,useState } from 'react';
import Investornavbar from './Investornavbar';
//import { toast } from 'react-toastify';
//import API from '../API';
import '../investor/Available.css'

function Investerdashbord() {
  // const [loans, setLoans] = useState([]);

  // useEffect(() => {
  //   const fetchLoans = async () => {
  //     try {
  //       const response = await API.get("loans/available");
  //       console.log(response)
  //       if (response.status === 200) {
  //         const updatedLoans = response.data.map((loan) => ({
  //           ...loan,
  //           status: loan.status || "Pending",
  //         }));
  //         setLoans(updatedLoans);
  //       } else {
  //         toast.error("Failed to fetch loans.");
  //       }
  //     } catch (error) {
  //       toast.error(error.response?.data?.message || "Error fetching loans.");
  //     }
  //   };

  //   fetchLoans();
  // }, []);

  // const handleInvestment = async (loan) => {
  //   try {
  //     const response = await API.post(`/loans/${loan._id}/invest`, {
  //       status: "Approved",
  //     });
  //     if (response.status === 201) {
  //       toast.success("Investment successful!");
  //       setLoans((prevLoans) => prevLoans.filter((l) => l._id !== loan._id));
  //     } else {
  //       toast.error("Failed to invest in the loan.");
  //     }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Error processing investment.");
  //   }
  // };
  return (
    <div >
      <div>
      <Investornavbar></Investornavbar> 
      </div>
      {/* <div className="div99">
      <h2 className="h2">Loan Requests</h2>
         {loans.length === 0 ? (
           <p className="para44">No loan requests found.</p>
         ) : (
           <div className="div43">
             {loans.map((loan) => (
               <div key={loan._id} className="loan-card">
                 <p className="par8">Amount: ₹{loan.amount}</p>
                 <p className="par8">Duration: {loan.duration} months</p>
                 <p className="par8">Interest Rate: {loan.interestRate}%</p>
                 <p className="par8">Purpose: {loan.purpose}</p>
                 <button className="invest-button" onClick={() => handleInvestment(loan)}>
                   Invest
                 </button>
               </div>
             ))}
           </div>
         )}
      </div> */}
       </div>
  )
}

export default Investerdashbord
