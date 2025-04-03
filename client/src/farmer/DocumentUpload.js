// import React, { useState } from "react";
// import API from "../API";
// import { toast } from "react-toastify";
// import Navbar from "../dashbord/Navbar";
// import './Document.css'

// const DocumentUpload = () => {
//   const [document, setDocument] = useState({
//     title: "",
//     type: "farm_certificate",
//     relatedToModel: "",
//     relatedToId: "",
//   });
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setDocument({ ...document, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       toast.error("Please select a file to upload.");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     const userId = localStorage.getItem("userId"); 

//     if (!token || !userId) {
//       toast.error("Please log in first.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("title", document.title);
//       formData.append("type", document.type);
//       formData.append("relatedToModel", document.relatedToModel);
//       formData.append("relatedToId", document.relatedToId);
//       formData.append("document", file);
//       formData.append("owner", userId); 

//       await API.post("/documents/upload", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       toast.success("Document uploaded successfully!");
//       setDocument({ title: "", type: "farm_certificate", relatedToModel: "", relatedToId: "" });
//       setFile(null);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to upload document");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="div8">
//         <h2>📄 Upload Document</h2>
//         <form onSubmit={handleSubmit} className="form3">
//           <input
//             type="text"
//             name="title"
//             placeholder="Document Title"
//             value={document.title}
//             onChange={handleChange}
//             required
//             className="input-field"
//           />

//           <select name="type" value={document.type} onChange={handleChange} required className="select">
//             <option value="farm_certificate">Farm Certificate</option>
//             <option value="loan_agreement">Loan Agreement</option>
//             <option value="identity_proof">Identity Proof</option>
//             <option value="other">Other</option>
//           </select>

//           <input type="file" onChange={handleFileChange} required className='file' />

//           <button type="submit" className="button4" disabled={loading}>
//             {loading ? "Uploading..." : "Upload"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DocumentUpload;


import React, { useState } from "react";
import API from "../API";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../dashbord/Navbar";
import './Document.css'

const DocumentUpload = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "farm_certificate",
    file: null,
  
  });
  const navigate = useNavigate();


  const handleChanges = (e) => {
    if (e.target.name === "file") {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };


  const handleSubmits = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in first.");
      return;
    }

  


    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("type", formData.type);
    formDataToSubmit.append("file", formData.file);

 
    formDataToSubmit.append("token", token);

    try {
      const response = await API.post("/documents/upload", formDataToSubmit, {
        headers: {
          Authorization: `Bearer ${token}`,  
          "Content-Type": "multipart/form-data",
        },
      });
console.log(response)
      toast.success("Document uploaded successfully!");
      navigate("/mydocuments");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload document");
    }
  };

  return (
    
    <div>
      <div><Navbar/></div>
      <div>
      <div >
      <div className="upload-card">
        <h2 className="upload-title">Upload Document</h2>
        <form onSubmit={handleSubmits} className="upload-form">
          <input
            type="text"
            name="title"
            placeholder="Document Title"
            value={formData.title}
            onChange={handleChanges}
            required
            className="upload-input"
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleChanges}
            required
            className="upload-select"
          >
            <option value="farm_certificate">Farm Passbook</option>
            <option value="loan_agreement">Bank Details</option>
            <option value="identity_proof">Identity Proof</option>
            <option value="other">Other</option>
          </select>
        
          <div className="file-input-container">
            <label htmlFor="file-upload" className="file-input-label">
              Choose File
            </label>
            <input
              id="file-upload"
              type="file"
              name="file"
              onChange={handleChanges}
              required
              className="file-input"
            />
            {formData.file && <p className="file-name">{formData.file.name}</p>}
          </div>
          <button type="submit" className="upload-button">
            Upload Document
          </button>
        </form>
      </div>
    </div>

      </div>
    </div>
  );
};

export default DocumentUpload;
