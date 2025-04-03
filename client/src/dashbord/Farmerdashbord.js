import React from 'react'
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import API from '../API'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import './Farm.css'

const Farmerdashbord = () => {

  const [farms, setFarms] = useState([]);

  const fetchFarms = async () => {
    try {
      const {data} = await API.get('/farms/my-farms');
      setFarms(data);
    } catch {
      toast.error('Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchFarms();
  }, []);
  return (
    <div>
    <div>
      <Navbar />
      <div className="farm-container">
        <h1>My Farms</h1>
        {farms.length === 0 ? (
          <p>No farms found.</p>
        ) : (
          <div className="farm-grid">
            {farms.map((farm) => (
              <div  className="farm-card">
                <img
                src={`http://localhost:3433/${farm.images[0]}`}
                alt={farm.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
                />
                <h2>{farm.name}</h2>
                <p><strong>Description:</strong> {farm.description}</p>
                <p><strong>Location:</strong> {farm.location}</p>
                <p><strong>Size:</strong> {farm.size}</p>
                <p><strong>Farm Type:</strong> {farm.farmType}</p>
                <p><strong>Production Capacity:</strong> {farm.productionCapacity}</p>
                <Link to={`/loans/${farm.id || farm._id}`}>
                                  <button className='buttons'>Loan request</button>
                                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  )
}

export default Farmerdashbord


