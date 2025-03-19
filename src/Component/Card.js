import React from "react";

function Card(props) {
  return (
    <div className="card-container">
      <div className="card">
        <img src={props.url} className="card-img-top" alt="Profile" />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text" style={{fontWeight:"500"}}>{props.designation}</p>
          <p className="card-text"><span><i className="fa-solid fa-envelope"></i></span>&nbsp;&nbsp;{props.email}</p>
          <p className="card-text"><span><i className="fa-solid fa-phone"></i></span>&nbsp;&nbsp;{props.mobile}</p>
          <a href="/" className="btn btn-dark mt-1">
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;
