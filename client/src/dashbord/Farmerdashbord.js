import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../API";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Farm.css";

const Farmerdashbord = () => {
  const [farms, setFarms] = useState([]);

  const fetchFarms = async () => {
    try {
      const { data } = await API.get("/farms/my-farms");
      setFarms(data);
    } catch {
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="farm-container" style={{textAlign:"center"}}>
        <h1>My Farms</h1>
        {farms.length === 0 ? (
          <p>No farms found.</p>
        ) : (
          <div className="farm-grid">
            {farms.map((farm) => (
              <div key={farm.id || farm._id} className="image">
                <img
                  src={`http://localhost:3433/${farm.images[0]}`}
                  alt={farm.name}
                />
                <div className="info">
                <p style={{ fontSize: "16px" }}><strong>{farm.name}</strong></p>
                  <p><strong>Description:</strong> {farm.description}</p>
                  <p><strong>Location:</strong> {farm.location}</p>
                  <p><strong>Size:</strong> {farm.size}</p>
                  <p><strong>Farm Type:</strong> {farm.farmType}</p>
                  <Link to={`/loans/${farm.id || farm._id}`}>
                    <button className="buttons">Loan request</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Farmerdashbord;
