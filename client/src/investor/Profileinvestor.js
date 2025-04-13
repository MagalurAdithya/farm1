import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../API";
import Investornavbar from "../dashbord/Investornavbar";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
        } else {
          const response = await API.get("/users/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);

          const documentsResponse = await API.get("/documents/my-documents", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setDocuments(documentsResponse.data);
        }
      } catch (err) {
        toast.error("Error fetching profile data");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div><Investornavbar></Investornavbar></div>
      <div>
      <div className="profile-container" >
     
     <h1 >User Profile</h1>
     <div className="profile-info">
       {user.profilePic && (
         <div className="profile-picture">
           <img
             src={`http://localhost:3433/${user.profilePic}`}
             alt="Profile"
             className="profile-image"
           />
         </div>
       )}
       <div className="user-details">
         {/* <h3 style={{ color: "black" }}>User Profile</h3> */}
         <div className="user-detail">
           <b className="bold">First Name:</b>
           <p style={{ fontSize: "1.30rem" }}>{user.firstName}</p>
         </div>
         <div className="user-detail">
           <b className="bold">Last Name:</b>
           <p style={{ fontSize: "1.30rem" }}>{user.lastName}</p>
         </div>
         <div className="user-detail">
           <b className="bold">Email:</b>
           <p style={{ fontSize: "1.30rem" }}>{user.email}</p>
         </div>
         <div className="user-detail">
           <b className="bold">Role:</b>
           <p id="text">{user.role}</p>
         </div>
         <div className="user-detail">
           <b className="bold">Status:</b>
           <p style={{ fontSize: "1.25rem" }} className={user.isVerified ? 'verified' : 'not-verified'}>
             {user.isVerified ? "Verified" : "Not Verified"}
           </p>
         </div>

         <h3 style={{ color: "black" }}>My Documents Status</h3>
         <div>
           {documents.length === 0 ? (
             <p className="nodocuments" style={{color:"#00cc99"}}>No documents uploaded yet.</p>
           ) : (
             <ul>
               {documents.map((doc) => (
                 <li key={doc._id}>
                   <b className="bold" style={{ fontWeight: 'bold' }}>{doc.title} :</b> -{" "}
                   <span style={{ color: doc.isVerified ? "green" : "red" }}>
                     {doc.isVerified ? "Verified" : "Not Verified"}
                   </span>
                 </li>
               ))}
             </ul>
           )}
         </div>

         <NavLink
           to="/Documents"
           className="nav-item"
           style={{
             backgroundColor: "black",
             color: "white",
             padding: "10px 20px",
             textDecoration: "none",
             borderRadius: "5px",
             transition: "background-color 0.3s, color 0.3s",
           }}
         >
           Upload Documents
         </NavLink>
       </div>
     </div>
   </div>
      </div>
    </div>
  );
};

export default UserProfile;