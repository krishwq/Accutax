import React from "react";
import "./Css/Conatct.css"
import { useAuth0 } from "@auth0/auth0-react";

function Contact() {
const { user} = useAuth0();
    const handlesubmit= async (event)=>{
        event.preventDefault();
        const formData = new FormData(event.target);

    formData.append("access_key", "30439244-c6a5-49ff-8b84-711b48dc67f2");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());
    console.log(res);

    document.getElementById('namecontact').value=user?user.name?user.name:user.nickname:"";
    document.getElementById('emailcontact').value=user?.email || '';
    document.getElementById('message').value="";
    }
    
  return (
    <>
    <h1 className="contact-heading">Contact With Us</h1>
    <p className="contact-desc">Feel free to reach out to us with any questions and inquiries</p>
    <div className="contact-cont">
    <div className=" contact-form">
    
      <div className="contact-1 mt-2">
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label htmlFor="namecontact" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="namecontact"
              name="namecontact"
              aria-describedby="emailHelp"
              placeholder="Enter your name"
              required
              defaultValue={user?user.name?user.name:user.nickname:""}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="emailcontact" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="emailcontact"
              name="emailcontact"
              placeholder="Enter your email"
              required
              defaultValue={user?.email || ''}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              className="form-control"
              name="message"
              id="message"
              rows="3"
              style={{ resize: "none" }}
              placeholder="Enter your message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className={`btn btn-info my-2`}
            style={{ width: "100%" }}
          >
            Send Message
          </button>
          <div className="my-1">We'll get back to you as soon as possible!</div>
        </form>
      </div>
    </div>
    <div className="contact-details">
      <p><span><i className="fa-solid fa-phone"></i></span>&nbsp;&nbsp;&nbsp;<span>+1 123-456-7890</span></p>
      <p><span><i className="fa-solid fa-globe"></i></span>&nbsp;&nbsp;&nbsp;<span>www.accutax.com</span></p>
      <p><span><i className="fa-solid fa-envelope"></i></span>&nbsp;&nbsp;&nbsp;<span>companyaccutax@gmail.com</span></p>
      <p><span><i className="fa-solid fa-location-dot"></i></span>&nbsp;&nbsp;&nbsp;<span>123 Main st, Bhubaneswar, Odisha, 752050</span></p>
    </div>
    </div>
    </>
  );
}

export default Contact;
