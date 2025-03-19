import React from 'react';
import './Css/Footer.css';
function Footer() {
  return (
    <div className='footer'>
      <div className="location">
        <h3>Location</h3>
        <p>123 Main St, Bhubaneswar <br />Khurda, Odisha <br /> ZIP:752050</p>
      </div>
      <div className='contact'>
        <h3>Conatct</h3>
        <p>Phone: +91 9876543210 <br />Email:  contact@example.com</p>
        <p>Follow Us: <br /><br />
         <a href="/"><i className="fa-brands fa-facebook" style={{color:"#74C0FC"}}></i></a>  
        <a href="/"><i className="fa-brands fa-instagram"  style={{color:"#ec03fc"}} ></i></a>  
        <a href="/"><i className="fa-brands fa-twitter"  style={{color:"#74C0FC"}} ></i></a>
        <a href="/"><i className="fa-brands fa-linkedin" style={{color:"#74C0FC"}} ></i></a></p>
      </div>
    </div>
  );
}

export default Footer;
