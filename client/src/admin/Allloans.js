// import React, { useState, useEffect } from "react";
// import API from "../API";
// import { toast } from "react-toastify";
// import Navbaradmin from "../dashbord/Navbaradmin";
// import './Allloans.css'

// function AllLoans() {
//   const [loans, setLoans] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLoans = async () => {
//       try {
//         const response = await API.get("/admin/loans");
//         console.log(response)
//         if (response.status === 201) {
//           setLoans(response.data);
//         } else {
//           toast.error("Failed to fetch loans.");
//         }
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Error fetching loans.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLoans();
//   }, []);

//   return (
//     <div >
//       <div>
//         <Navbaradmin></Navbaradmin>
//       </div >
//       <div className="div09">
//       <h2 >All Loans</h2>
//       {loading ? (
//         <p >Loading loans...</p>
//       ) : loans.length === 0 ? (
//         <p >No loans found.</p>
//       ) : (
//         <div className="div030">
//           {loans.map((loan) => (
//             <div key={loan._id} >
//               <p >Farmer: {loan.farm?.farmer?.firstName} {loan.farm?.farmer?.lastName}</p>
//               <p > Amount: ₹{loan.amount}</p>
//               <p > Status: {loan.status}</p>
//             </div>
//           ))}
//         </div>
//       )}
//       </div>
//     </div>
//   );
// }

// export default AllLoans;




import React, { useState, useEffect } from "react";

import API from "../API";
import Navbaradmin from "../dashbord/Navbaradmin";
import './Allloans.css'

const Allloans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    setLoading(true);
    try {
      const response = await API.get("/admin/loans");
      setLoans(response.data);
    } catch (error) {
      console.error("Error fetching loans:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
   <div>
    <div><Navbaradmin></Navbaradmin></div>
    <div>
    <div className="div112">
        <div className="div333">
          <h1 className="head1"  style={{marginTop:"50px"}}> Loans </h1>
          {loading ? (
            <p className="para">
              <b>Loading loans...</b>
            </p>
          ) : loans.length > 0 ? (
            <div className="div23">
              {loans.map((loan) => (
                <div key={loan._id} className="div44">
                  <h2>Farm: {loan.farm ? loan.farm.name : "No farm name available"}</h2>
                  <p>
                    <b>Loan Id:</b> Rs {loan._id}
                  </p>
                  <p>
                    <b>Amount:</b> Rs {loan.amount}
                  </p>
                  <p>
                    <b>Interest Rate:</b> {loan.interestRate}%
                  </p>
                  <p>
                    <b>Duration:</b> {loan.duration} months
                  </p>
                  <p>
                    <b>Status:</b> {loan.status}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="para1">No loans found.</p>
          )}
        </div>
      </div>
    </div>
   </div>
  );
};

export default Allloans;
