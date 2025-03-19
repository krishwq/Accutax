import React from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";



function Element4() {
  const { isAuthenticated} = useAuth0();

  return (
    <div className='element4-cont'>
      <div className="elemnt4-text">
        <div className='ai-text'>
              <h2># Ask to AI – Your Intelligent Assistant for Every Question</h2><br />
              <p>Your go-to assistant for instant answers, insights, and solutions—powered by artificial intelligence. Get help with anything, anytime!</p>
          <p><span><i className="fa-solid fa-circle-check" style={{color: "#ffffff" }}></i></span>&nbsp;&nbsp;<span>CA-certified A.I. tax assistant.</span></p>
          <p><span><i className="fa-solid fa-circle-check" style={{color: "#ffffff" }}></i></span>&nbsp;&nbsp;<span>Unlimited access.</span></p>
          <p><span><i className="fa-solid fa-circle-check" style={{color: "#ffffff" }}></i></span>&nbsp;&nbsp;<span>Get instant response.</span></p><br />
          {isAuthenticated?(<Link to="/chat" className='btn-ai btn btn-info'>Try Now</Link>):(<p style={{color:"#A6F6FF"}}>** Please Login to chat with A.I</p>)}
        </div>
      </div>
      <div className='element4-img'>
        <div className="mobile">
            <div className="mobile-screen">
              <div className="camera"></div>
              <div className="mobile-chat-body">
                <div className="chat-heading">TaxGen AI</div>
                <div className="chat-body">
                  <div className="msg-right">How do I file my tax returns online ?</div>
                  <div className="response">1.Gather Documents – Income statements, deductions, and bank details. <br />
2.Choose Platform – Use the government portal or tax software. <br />
3.Log In & Fill Forms – Enter income, deductions, and verify calculations. <br />
4.Submit & Verify – Review and e-verify if required. <br />
5.Pay Taxes (if any) – Use online banking or card. <br />
6.Download Receipt & Track – Save acknowledgment and monitor refund status. <br />
Need country-specific steps?</div>
                </div>
                <div className="chat-footer">
                  <div className="send-txt">Message</div>
                  <div className="send-btn"><i className="fa-solid fa-paper-plane"></i></div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Element4;
