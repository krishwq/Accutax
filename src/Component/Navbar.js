import React, { useRef, useEffect,useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./Css/Navbar.css";
import logo from "./images/Accutax-logo.png";
import userpicture from "./images/userpicture.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import TaxContext from "../Context/Tax/TaxContext";
import loader from  "./images/loaderanimation.gif";


const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const history = useHistory();
  const location = useLocation();
  const {isloading}=useContext(TaxContext);

  useEffect(() => {
    const createUser = async () => {
      if (isAuthenticated && user && !user.email_verified) {
        history.push("/auth");
      }
  
      if (user) {
        const response = await fetch(`https://accutax-backend.onrender.com/api/auth/createuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
          }),
        });
  
        const json = await response.json();
        console.log(json);
      } 
    };
  
    createUser(); // Call the async function
  
  }, [isAuthenticated, user, history]);

  const ref = useRef();
  const refclose = useRef();

  const handleclick = () => {
    ref.current?.click();
  };

  const handleclose = () => {
    refclose.current?.click();
  };

  return (
    <>
    {isloading && (
      <>
      <div className="blurOverlay"></div>
                <img src={loader} alt="loader" className="spinner" />
  </>
  )}
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo"  style={{height:"30px"}}/>
          </Link>

          <div className="d-flex align-items-center justify-content-between">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className={`nav-link mt-1 ${location.pathname === "/" ? "active" : ""}`} to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link mt-1 ${location.pathname === "/team" ? "active" : ""}`} to="/team">
                    Our Team
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link mt-1 ${location.pathname === "/services" ? "active" : ""}`} to="/services">
                    Services
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link mt-1 ${location.pathname === "/plans" ? "active" : ""}`} to="/plans">
                    Plans
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link mt-1 ${location.pathname === "/contact" ? "active" : ""}`} to="/contact">
                    Contact Us
                  </Link>
                </li>
                <li>
                  {isAuthenticated ? (
                    <button className="btn btn-outline-info mx-2 mt-1" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                      Log Out
                    </button>
                  ) : (
                    <button className="btn btn-outline-info mx-2 mt-1" onClick={() => loginWithRedirect()}>
                      Log In
                    </button>
                  )}
                </li>
              </ul>
            </div>

            {/* User Profile Picture */}
            {isAuthenticated && (
              
                <Link to="/userProfile" className="mx-2" >
                <img
                  src={user?.picture || userpicture}
                  alt="User Avatar"
                  onError={(e) => { e.target.src = userpicture; }} // If image fails, use default
                  style={{ height: "30px", width: "30px", borderRadius: "50%" }}
                />
                </Link>
            )}

            {/* Mobile Navbar Toggle */}
            <button className="navbar-toggler" type="button" onClick={handleclick}>
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <button ref={ref} className="btn btn-primary d-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        Button with data-bs-target
      </button>

      <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <button ref={refclose} type="button" className="btnclose bg-transparent border-0" data-bs-dismiss="offcanvas" aria-label="Close" style={{ fontSize: "25px" }}>
            <i className="fa-solid fa-xmark" style={{ color: "white" }}></i>
          </button>
        </div>
        <div className="offcanvas-body">
          <center>
            <ul className="navbar navbar-nav me-auto mb-2 mb-lg-0 navbar-dark">
              <li className="nav-item">
                <Link className="nav-link altnavlink" onClick={handleclose} to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                  <Link className={`nav-link mt-1 ${location.pathname === "/team" ? "active" : ""}`} to="/team">
                    Our Team
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link mt-1 ${location.pathname === "/services" ? "active" : ""}`} to="/services">
                    Services
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link mt-1 ${location.pathname === "/plans" ? "active" : ""}`} to="/plans">
                    Plans
                  </Link>
                </li>
              <li className="nav-item">
                <Link className="nav-link altnavlink" onClick={handleclose} to="/contact">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item" onClick={handleclose}>
                {isAuthenticated ? (
                  <button className="btn btn-outline-info mx-2 mt-1" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                    Log Out
                  </button>
                ) : (
                  <button className="btn btn-outline-info mx-2 mt-1" onClick={() => loginWithRedirect()}>
                    Log In
                  </button>
                )}
              </li>
            </ul>
          </center>
        </div>
      </div>
    </>
  );
};

export default Navbar;
