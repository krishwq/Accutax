import React from 'react';
import faster from "./images/faster.png";
import currency from "./images/currency.png";
import cheaper from "./images/cheaper.png";
import insurance from "./images/insurance.png";


function Element3() {
  return (
    <div className='element3-cont'>
      <div className="feature-cont">
        <img src={faster} alt="faster" style={{
          height:"40px",
          width:"53px",
        }}/>
        <h4>10x Faster</h4>
        <p>A.I eliminates 95% of your work</p>
      </div>
      <div className="feature-cont">
        <img src={currency} alt="currency" style={{
          height:"40px",
          width:"40px",
        }}/>
        <h4>Maximum refund</h4>
        <p>Save up to $3,700 extra in taxes</p>
      </div>
      <div className="feature-cont">
        <img src={cheaper} alt="cheaper" style={{
          height:"40px",
          width:"55px",
        }} />
        <h4>5x Cheaper</h4>
        <p>Than other CAs</p>
      </div>
      <div className="feature-cont">
        <img src={insurance} alt="insurance" style={{
          height:"45px",
          width:"40px",
        }} />
        <h4>Full Audit Insurance</h4>
        <p>CAs got your back</p>
      </div>
    </div>
  );
}

export default Element3;
