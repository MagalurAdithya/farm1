import React, { useState } from "react";
import API from "../API";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Addfarms.css'
import Navbar from "../dashbord/Navbar";

const Addfarms = () => {
  const [farmData, setFarmData] = useState({
    name: "",
    description: "",
    location: "",
    farmType: "",
    size: "",
    productionCapacity: "",
    images: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFarmData({ ...farmData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFarmData({ ...farmData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in farmData) {
      if (key === "images") {
        for (let i = 0; i < farmData.images.length; i++) {
          formData.append("images", farmData.images[i]);
        }
      } else {
        formData.append(key, farmData[key]);
      }
    }

    try {
      await API.post("/farms", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      toast.success("Farm added successfully!");
      navigate("/farmerdashbord");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error during adding farm land"
      );
    }
  };

  return (
   <div>
    <div><Navbar></Navbar></div>
    <div className="div33" >
      <div className="div22">
        <h2>Add Farm</h2>
        <form onSubmit={handleSubmit} className="form4">
          <input
            type="text"
            name="name"
            placeholder="Farm Name"
            value={farmData.name}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={farmData.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={farmData.location}
            onChange={handleChange}
          />
          <input
            type="text"
            name="farmType"
            placeholder="Farm Type"
            value={farmData.farmType}
            onChange={handleChange}
          />
          <input
            type="number"
            name="size"
            placeholder="Size (acres)"
            value={farmData.size}
            onChange={handleChange}
          />
          <input
            type="text"
            name="productionCapacity"
            placeholder="Production Capacity"
            value={farmData.productionCapacity}
            onChange={handleChange}
          />
          <input type="file" name="images" multiple onChange={handleImageChange} />
          <button type="submit">Add Farm</button>
        </form>
      </div>
    </div>
   </div>
  );
};

export default Addfarms;


// import React, { useState } from "react";
// import API from "../API";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// // import './Addfarms.css'
// import Navbar from "../dashbord/Navbar";

// const Addfarms = () => {
//   const [farmData, setFarmData] = useState({
//     name: "",
//     description: "",
//     location: "",
//     farmType: "",
//     size: "",
//     productionCapacity: "",
//     images: [],
//   });
//    const [formData, setFormData] = useState({
//       title: "",
//       type: "farm_certificate",
//       file: null,
    
//     });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFarmData({ ...farmData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setFarmData({ ...farmData, images: e.target.files });
//   };
//   const handleChanges = (e) => {
//     if (e.target.name === "file") {
//       setFormData({ ...formData, file: e.target.files[0] });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     for (const key in farmData) {
//       if (key === "images") {
//         for (let i = 0; i < farmData.images.length; i++) {
//           formData.append("images", farmData.images[i]);
//         }
//       } else {
//         formData.append(key, farmData[key]);
//       }
//     }

//     try {
//       await API.post("/farms", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       toast.success("Farm added successfully!");
//       navigate("/farmerdashbord");
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Error during adding farm land"
//       );
//     }
//   };
//     const handleSubmits = async (e) => {
//       e.preventDefault();
  
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("Please log in first.");
//         return;
//       }
//       const formDataToSubmit = new FormData();
//       formDataToSubmit.append("title", formData.title);
//       formDataToSubmit.append("type", formData.type);
//       formDataToSubmit.append("file", formData.file);
  
   
//       formDataToSubmit.append("token", token);
  
//       try {
//         const response = await API.post("/documents/upload", formDataToSubmit, {
//           headers: {
//             Authorization: `Bearer ${token}`,  
//             "Content-Type": "multipart/form-data",
//           },
//         });
//   console.log(response)
//         toast.success("Document uploaded successfully!");
//         navigate("/mydocuments");
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to upload document");
//       }
//     };
  

//   return (
//    <div>
//     <div><Navbar></Navbar></div>
//     <div className="div33" >
//       <div className="div22">
//         <h2>Add Farm</h2>
//         <form onSubmit={handleSubmit} className="form4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Farm Name"
//             value={farmData.name}
//             onChange={handleChange}
//           />
//           <textarea
//             name="description"
//             placeholder="Description"
//             value={farmData.description}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="location"
//             placeholder="Location"
//             value={farmData.location}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="farmType"
//             placeholder="Farm Type"
//             value={farmData.farmType}
//             onChange={handleChange}
//           />
//           <input
//             type="number"
//             name="size"
//             placeholder="Size (acres)"
//             value={farmData.size}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="productionCapacity"
//             placeholder="Production Capacity"
//             value={farmData.productionCapacity}
//             onChange={handleChange}
//           />
//           <input type="file" name="images" multiple onChange={handleImageChange} />
//           <button type="submit">Add Farm</button>
//         </form>
//       </div>
//     </div>
//     <div >
//       <div >
//         <h2>Upload Document</h2>
//         <form onSubmit={handleSubmits}>
//           <input
//             type="text"
//             name="title"
//             placeholder="Document Title"
//             value={formData.title}
//             onChange={handleChanges}
//             required
            
//           />
//           <select
//             name="type"
//             value={formData.type}
//             onChange={handleChanges}
//             required
            
//           >
//             <option value="farm_certificate">Farm Passbook</option>
//             <option value="loan_agreement">Bank Details</option>
//             <option value="identity_proof">Identity Proof</option>
//             <option value="other">Other</option>
//           </select>
        
//           <div >
//             <label htmlFor="file-upload">
//               Choose File
//             </label>
//             <input
//               id="file-upload"
//               type="file"
//               name="file"
//               onChange={handleChanges}
//               required
              
//             />
//             {formData.file && <p>{formData.file.name}</p>}
//           </div>
//           <button type="submit">
//             Upload Document
//           </button>
//         </form>
//       </div>
//     </div>
//    </div>
//   );
// };

// export default Addfarms;
