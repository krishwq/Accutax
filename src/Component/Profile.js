import React, { useState } from 'react';
import './Css/Profile.css';
import { useAuth0 } from "@auth0/auth0-react";
import userpicture from './images/userpicture.png';

// Importing the pages for personal and income details
import PersonalDetails from './PersonalDetails';
import IncomeDetails from './IncomeDetails';

function Profile() {
  const {user } = useAuth0();
  const [content, setContent] = useState(<PersonalDetails/>);

  return (
    <div className="profile-container">
      {/* Sidebar Links */}

      <div className="sidebar">
        <div className='Profileimage'>
        <img
                  src={user?.picture || userpicture}
                  alt="User Avatar"
                  onError={(e) => { e.target.src = userpicture; }} // If image fails, use default
                  style={{width:"100%",height:"100%"}}
                />
        </div>
        <div className='link-div'>
        <button
          onClick={() => setContent(<PersonalDetails />)}
          className="sidebar-link"
        >
          Personal Details
        </button>
        <button
          onClick={() => setContent(<IncomeDetails />)}
          className="sidebar-link"
        >
          Income Details
        </button>
        </div>
      </div>

      {/* Content Box */}
      <div className="content">
        {content}
      </div>
    </div>
  );
}

export default Profile;
