
import React from 'react';
import Home from './Home';
import './About.css'
function AboutUs() {
  return (
    <div>
      <div><Home></Home></div>
      <div>
      <div className="about-section1">
      <h2 className="about-heading">Bridging Agriculture & Innovation</h2>

      <div className="about-cards-wrapper">
        <div className="about-card">
          <h3>The Role of Technology</h3>
          <p className='abouop'>
            Technology plays a vital role in modernizing agriculture by enhancing efficiency and productivity.
            From smart farming techniques to AI-driven analytics, our platform integrates cutting-edge solutions
            to support farmers and investors alike.
          </p>
        </div>

        <div className="about-card">
          <h3>Supporting Farmers</h3>
          <p className='abouop'>
            Farmers require modern tools and financial support to thrive in today’s competitive landscape.
            Our initiative ensures that they receive adequate resources, training, and funding to maximize their yield
            and income sustainability.
          </p>
        </div>

        <div className="about-card">
          <h3>Investment Opportunities</h3>
          <p className='abouop'>
            Investors have the chance to be part of the agricultural revolution by funding promising projects.
            With detailed insights and risk assessments, they can make informed decisions and contribute to
            a profitable and sustainable future.
          </p>
        </div>

        <div className="about-card">
          <h3>How the System Works</h3>
          <ol>
            <li><strong>Farmers</strong> register and list their projects needing financial support.</li>
            <li><strong>Experts</strong> assess the feasibility and sustainability of the projects.</li>
            <li><strong>Investors</strong> select projects based on their preferences and potential returns.</li>
            <li><strong>Funds</strong> are securely processed through our digital platform.</li>
            <li><strong>Farmers</strong> utilize investments for agricultural advancements.</li>
            <li><strong>Investors</strong> receive periodic updates and returns on successful projects.</li>
          </ol>
        </div>

        <div className="about-card">
          <h3>Why Partner With Us?</h3>
          <ul>
            <li>✔ Advanced Technology for Smarter Farming</li>
            <li>✔ Trusted Platform for Secure Transactions</li>
            <li>✔ Empowerment of Local Farmers</li>
            <li>✔ Sustainable and Eco-friendly Agricultural Growth</li>
            <li>✔ A Win-Win Model for All Participants</li>
          </ul>
        </div>

        <div className="about-card">
          <h3>Our Vision</h3>
          <p className='abouop'>
            We envision a future where agriculture is driven by technology and financial inclusivity.
            Our mission is to empower farmers with the resources they need while providing investors
            with lucrative opportunities to support agricultural innovation and global food security.
          </p>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
}

export default AboutUs;
