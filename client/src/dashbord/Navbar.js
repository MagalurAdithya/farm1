import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    navigate('/');
  };
  const get = async () =>{
    navigate('/farmerprofile')
  }

  return (
    <div className="navbar">
      <Link to='/farmerdashbord'><h3 className="logo" >FarmIT</h3></Link>
      <nav>
        <ul className="nav-links">
         
          <li><Link to="/addfarms">Add Farm</Link></li>
          {/* <li><Link to="/loans">Loan</Link></li> */}
          <li><Link to='/repay'>Repay</Link></li>
          <li><Link to="/issue">Issue</Link></li>
          <li><Link to='/document'>Document</Link></li>
          <li><Link to="/mydocuments">My-Documents</Link></li>
          {/* <li><Link to='/transactions'>Transaction</Link></li> */}
          
        </ul>
      </nav>
    
      <div className="nav-buttons">
  <button className="profile-btn" onClick={get}>Profile</button>
  <button className="logout-btn" onClick={logout}>LOGOUT</button>
</div>
    </div>
  );
}

export default Navbar;
