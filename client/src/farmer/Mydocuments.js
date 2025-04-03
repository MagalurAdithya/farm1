import React, { useEffect, useState } from "react";
import API from "../API";

import Navbar from "../dashbord/Navbar";
import './Mydocuments.css'

const MyDocuments = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first.");
        return;
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await API.get("/documents/my-documents", config);
      setDocuments(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch documents");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this document?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first.");
        return;
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };
      await API.delete(`/documents/${id}`, config);
      alert("Document deleted successfully!");
      fetchDocuments();
    } catch (error) {
      console.error("Error deleting document:", error);
      alert(error.response?.data?.message || "Failed to delete document");
    }
  };

  return (
    <div>
        <div>
            <Navbar></Navbar>
        </div>
        <div>
        <div className="document-container">
     
     <h2 className="frist">My Documents</h2>
     {documents.length === 0 ? (
       <p className="no-documents">No documents uploaded.</p>
     ) : (
       <table className="document-table">
         <thead>
           <tr>
             <th>Title</th>
             <th>Type</th>
             <th>Uploaded</th>
             <th>Actions</th>
           </tr>
         </thead>
         <tbody>
           {documents.map((doc) => (
             <tr key={doc._id}>
               <td>{doc.title}</td>
               <td>{doc.type}</td>
               <td>{new Date(doc.uploadedAt).toLocaleDateString()}</td>
               <td>
                 <a
                   href={`http://localhost:3433/${doc.filePath}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="view-button"
                 >
                   View
                 </a>
                 <button
                   className="delete-button"
                   onClick={() => handleDelete(doc._id)}
                 >
                   Delete
                 </button>
               </td>
             </tr>
           ))}
         </tbody>
       </table>
     )}
   </div>
        </div>
    </div>
  );
};

export default MyDocuments;
