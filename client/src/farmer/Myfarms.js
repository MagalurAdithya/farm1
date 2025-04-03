// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from '../dashbord/Navbar'
// import API from '../API';
// import { toast } from 'react-toastify';
// import './Myfarms.css'


// function Myfarms() {
//   const [farms, setFarms] = useState([]);

//   const fetchFarms = async () => {
//     try {
//       const {data} = await API.get('/farms/my-farms');
//       setFarms(data);
//     } catch {
//       toast.error('Failed to fetch data');
//     }
//   };


//   useEffect(() => {
//     fetchFarms();
//   }, []);

//   return (
//     <div>
//       <Navbar/>
//       <div className="farm-container">
//         <h1 className='head'>My Farms</h1>
//         {farms.length === 0 ? (
//           <p>No farms found.</p>
//         ) : (
//           <div className="farm-grid">
//             {farms.map((farm) => (
//               <div  className="farm-card">
//                 <img
//                 src={`http://localhost:3433/${farm.images[0]}`}
//                 alt={farm.name}
//                 style={{
//                   width: "100%",
//                   height: "200px",
//                   objectFit: "cover",
//                   borderRadius: "5px",
//                 }}
//                 />
//                 <h2>{farm.name}</h2>
//                 <p><strong>Description:</strong> {farm.description}</p>
//                 <p><strong>Location:</strong> {farm.location}</p>
//                 <p><strong>Size:</strong> {farm.size}</p>
//                 <p><strong>Farm Type:</strong> {farm.farmType}</p>
//                 <p><strong>Production Capacity:</strong> {farm.productionCapacity}</p>
//                 <Link to={`/loans/${farm.id}`}>
//                 <button className='buttons'>Loan request</button>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         )}
      
//       </div>
//     </div>
//   );
// }

// export default Myfarms;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../dashbord/Navbar';
import API from '../API';
import { toast } from 'react-toastify';
import './Myfarms.css';

function Myfarms() {
  const [farms, setFarms] = useState([]);

  const fetchFarms = async () => {
    try {
      const { data } = await API.get('/farms/my-farms');
      setFarms(data);
    } catch (error) {
      toast.error('Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="farm-container">
        <h1 className='head'>My Farms</h1>
        {farms.length === 0 ? (
          <p>No farms found.</p>
        ) : (
          <div className="farm-grid">
            {farms.map((farm) => (
              <div key={farm.id || farm._id} className="farm-card">
                <img
                  src={farm.images?.length ? `http://localhost:3433/${farm.images[0]}` : "/default-image.jpg"}
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
                <p><strong>Size:</strong> {farm.size} acres</p>
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
  );
}

export default Myfarms;
