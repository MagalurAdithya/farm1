import React, { useState, useEffect } from "react";
import Navbaradmin from '../dashbord/Navbaradmin';
import API from '../API';
import './Allfarms.css'

const Allfarms = () => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFarms();
  }, []);

  const fetchFarms = async () => {
    setLoading(true);
    try {
      const response = await API.get("/admin/farms");
      setFarms(response.data);
      console.log(response)
    } catch (error) {
      console.error("Error fetching farms:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
   <div>
    <div>
          <Navbaradmin></Navbaradmin>
    </div>
    <div>
    <div className="farms">
        <div className="allfarms1">
          <h1 className="head2">All farms</h1>
          {loading ? (
            <p className="para9">
              <b>Loading farms...</b>
            </p>
          ) : farms.length > 0 ? (
            <div className="div00" style={{marginTop:"0px"}}>
              {farms.map((farm) => (
                <div key={farm._id} className="all-farms2">
                
                
                  <h2>{farm.name}</h2>
                  <p>
                    <b>Farmer:</b>{farm.farmer.firstName},
                    {farm.farmer.lastName}
                    
                  </p>
                  <p>
                    <b>Location:</b> {farm.location}
                  </p>
                  <p>
                    <b>Type:</b> {farm.farmType}
                  </p>
                  <p>
                    <b>Size:</b> {farm.size} acres
                  </p>
                  <p>
                    <b>Status:</b> {farm.status}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="para3">No farms found.</p>
          )}
        </div>
      </div>
    </div>
   </div>
  );
};

export default Allfarms;
