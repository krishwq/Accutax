import React from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import tax from "./images/taxfilling.png";
import business from "./images/business.png";
import audit from './images/audit.png';
import "./Css/Service.css";

function Service() {
    const { isAuthenticated,loginWithRedirect } = useAuth0();

  return (
    <div className='service-container'>
      <div className='service-header'>
        
        <h1>Our Tax Services</h1>
        <p>Comprehensive tax solutions tailored to your needs.</p>
      </div>
      
      <div className='service-list'>
        <div className='service-item'>
        <img src={tax} alt="Tax Filling" />
          <h4>Personal Tax Filing</h4>
          <p>Our certified CAs ensure accurate and hassle-free personal tax filing, maximizing your deductions.</p>
        </div>
        <div className='service-item'>
            <img src={business} alt="business" />
          <h4>Business Tax Solutions</h4>
          <p>From startups to enterprises, we provide tax planning, GST filing, and corporate tax management.</p>
        </div>
        <div className='service-item'>
            <img src={audit} alt="audit" />
          <h4>Audit Assistance</h4>
          <p>Full audit support with expert guidance to ensure compliance and peace of mind.</p>
        </div>
      </div>

      <div className='service-action'>
        <h2>Start Your Tax Journey with Us</h2>
        <p>Whether you're an individual or a business, our expert CAs are here to help.</p>
        {isAuthenticated?(<Link to="/main" className='btn-service btn btn-info'>Get Stated</Link> ):(<button onClick={() => loginWithRedirect()} className='btn-service btn btn-info'>Get Stated</button> )}
        
      </div>
    </div>
  );
}

export default Service;
