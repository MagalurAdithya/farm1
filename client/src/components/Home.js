import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className='div111'>
      <nav className='div000'>
        <div className="nav-brand">Farmit</div>
        <ul>
          <li><Link to='/about'>About Us</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
