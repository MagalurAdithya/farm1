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
        <h2 style={{textAlign:"center"}}>Add Farm</h2>
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

