
import React, { useState } from "react";
import API from "../API";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import './Doc.css'
import Investerdashbord from "../dashbord/Investerdashbord";

const DocumentUpload = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "farm_certificate",
    file: null,
  
  });
  const navigate = useNavigate();


  const handleChange = (e) => {
    if (e.target.name === "file") {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };


  const handleSubmit = async (e) => {
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
      navigate("/my-documents");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload document");
    }
  };

  return (
    
    <div>
      <div><Investerdashbord/></div>
      <div>
      <div className="upload-container">
      <div >
        <h2 className="upload-title">Upload Document</h2>
        <form onSubmit={handleSubmit} className="upload-form">
          <input
            type="text"
            name="title"
            placeholder="Document Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="upload-input"
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
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
              onChange={handleChange}
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