import React from 'react'
import { useNavigate,Link } from 'react-router-dom'
import './Navbaradmin.css'

function Navbaradmin() {
const navigate= useNavigate()
  const logout = async () => {
    navigate('/');
  };
  return (
    <div>
      <div className='div55'>
        <h3>FarmIT</h3>
        <nav className='nav2'>
            <ul>
                <li><Link to='/users'>Users</Link></li>
                {/* <li><Link to='/verify'>Check</Link></li> */}
                <li><Link to='/credit'>Credit</Link></li>
                <li><Link to='/verify-document'>Document</Link></li>
                <li><Link to='/All-Loans'>Loans</Link></li>
                <li><Link to='/All-farms'>Farms</Link></li>
                <li><Link to='/All-Issues'>Issue</Link></li>
                <li><Link to='/ALL-transactions'>Transaction</Link></li>

            </ul>
        </nav>
        <button className="button9" onClick={logout}>LOGOUT</button>
      </div>
    </div>
  )
}

export default Navbaradmin
