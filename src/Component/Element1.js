import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import vidio from "./record.mp4";

function Element1() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const [userData, setUserData] = useState({
    subscriptiondate: "",
    is_subscribed: "",
    suscribe_days: "",
  });
  useEffect(() => {
    const getUser = async () => {
      if (!user) return;
      try {
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }

        const json = await response.json();
        setUserData(json);
      } catch (err) {
        console.error("Fetch error:", err.message);
      }
    };
    getUser();
    console.log(userData);
    const subscriptionDate = new Date(userData.subscriptiondate); // Convert to Date object
    const currentDate = new Date(); // Get current date
    const diffTime = currentDate - subscriptionDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > userData.suscribe_days  && userData.is_subscribed) {
      setUserData({ ...userData, is_subscribed: false });
      const updateuser=async()=>{
        const response = await fetch("http://localhost:5000/api/auth/updateuser", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            subscriptiondate: "",
            is_subscribed: false,
            suscribe_days: 0,
          }),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
      }
      updateuser();
    }
  }, [user, userData]);
  return (
    <div className="element1_container">
      <div className="element1_text">
        <div className="text-desc">
          <h1>India’s #1 A.I. and CA tax filing service</h1>
          <br />
          <p>
            <span>
              <i
                className="fa-solid fa-circle-check"
                style={{ color: "#ffffff" }}
              ></i>
            </span>
            &nbsp;&nbsp;
            <span>CAs file your taxes from start to finish - 5x cheaper.</span>
          </p>
          <p>
            <span>
              <i
                className="fa-solid fa-circle-check"
                style={{ color: "#ffffff" }}
              ></i>
            </span>
            &nbsp;&nbsp;
            <span>A.I. finds every tax deduction - 10x faster.</span>
          </p>
          <p>
            <span>
              <i
                className="fa-solid fa-circle-check"
                style={{ color: "#ffffff" }}
              ></i>
            </span>
            &nbsp;&nbsp;
            <span>Full audit insurance - 100% money back guarantee.</span>
          </p>
          <br />
          {isAuthenticated ? (
  <Link
    to={userData.is_subscribed ? "/main" : "/plans"}
    className="btn-get-started btn btn-info"
  >
    Get Started
  </Link>
) : (
  <button
    onClick={loginWithRedirect}
    className="btn-get-started btn btn-info"
  >
    Get Started
  </button>
)}

        </div>
      </div>
      <div className="elemnet1_image">
        <div className="laptop">
          <div className="laptop__screen">
            <video src={vidio} alt="Screen" autoPlay muted loop></video>
          </div>
          <div className="laptop__bottom">
            <div className="laptop__under"></div>
          </div>
          <div className="laptop__shadow"></div>
        </div>
      </div>
    </div>
  );
}

export default Element1;
