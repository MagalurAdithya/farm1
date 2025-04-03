import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Investernavbar.css';

function Investornavbar() {
  const navigate = useNavigate();

  const logout = async () => {
    navigate('/');
  };
  const profile = async () =>{
    navigate("/investorprofile")
  }

  return (
    <div className="navbar-container">
      <h3>FarmIT</h3>
      <nav className="invester">
        <ul>
          <li>
            <Link to="/avaliable" className="nav-link">Available</Link>
          </li>
          <li>
            <Link to="/myinvestment" className="nav-link">My-Investment</Link>
          </li>
          <li>
            <Link to="/issues" className="nav-link">Issues</Link>
          </li>
          <li>
            <Link to="/Documents" className="nav-link">Document</Link>
          </li>
        </ul>
      </nav>
      <button className='button8' onClick={profile} >profile</button>
      <button className="button8" onClick={logout}>LOGOUT</button>
      
    </div>
  );
}

export default Investornavbar;
