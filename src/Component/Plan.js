import React from 'react';
import "./Css/Plan.css";
import { useAuth0 } from "@auth0/auth0-react";


function Plan() {
  const { user } = useAuth0();

    const buybasicplan=async() => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/updateuser", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email:user.email,
            subscriptiondate: new Date(),
            is_subscribed: true,
            suscribe_days: 365,
          }),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
        alert("Purchase successfull (Basic Plan) (365 days)!");
      } catch (err) {
        console.error("Update error:", err.message);
      }
    }
    const buystandardplan=async() => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/updateuser", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email:user.email,
            subscriptiondate: new Date(),
            is_subscribed: true,
            suscribe_days: 365*2,
          }),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
        alert("Purchase successfull (Basic Plan) (365 days)!");
      } catch (err) {
        console.error("Update error:", err.message);
      }
    }
  
  return (<>
    <h1 className='plan-heading'>Choose Your Plan</h1>
    <div className="plan-container">
      <div className="plan">
        <p className='plan-name'>Basic Plan</p>
        <p>
    <span className='price'>2999</span><span>/year</span></p>
        <button className='btn btn-dark btn-plan' onClick={buybasicplan} >Buy Now</button>
        <ul className='plan-ul'>
    <li>Tax Filing Assistance</li>
    <li>Tax Calculation Tools</li>
    <li>Expert Tax Consultation</li>
    <li>Document Preparation Services</li>
    <li>Audit Support & Assistance</li>
    <li>Latest Tax Law Updates</li>
    <li>Deductions & Credits Guidance</li>
    <li>Business & Corporate Tax Solutions</li>
    <li>State & Local Tax Services</li>
      </ul>
      </div>
      
      <div className="plan">
      <p className='plan-name' >Standard Plan</p>
        <p>
    <span className='price'>5559</span><span>/2 year</span></p>
        <button className='btn btn-dark btn-plan'onClick={buystandardplan}>Buy Now</button>
        <ul className='plan-ul'>
    <li>Tax Filing Assistance</li>
    <li>Tax Calculation Tools</li>
    <li>Expert Tax Consultation</li>
    <li>Document Preparation Services</li>
    <li>Audit Support & Assistance</li>
    <li>Latest Tax Law Updates</li>
    <li>Deductions & Credits Guidance</li>
    <li>Business & Corporate Tax Solutions</li>
    <li>State & Local Tax Services</li>
      </ul>
      </div>
    </div>
</>
  );
}

export default Plan;
