import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function PersonalDetails() {
  const { user } = useAuth0();
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    dob: "",
    gender: "",
    mobile: "",
    Age: "",
    nationallity: "",
    country: "",
    state: "",
    pin: "",
    address: "",
  });

  useEffect(() => {
    const getUser = async () => {
      if (!user) return;

      try {
        const response = await fetch("https://accutax-backend.onrender.com/api/auth/getuser", {
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
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://accutax-backend.onrender.com/api/auth/updateuser", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      alert("User details updated successfully!");
    } catch (err) {
      console.error("Update error:", err.message);
    }
  };

  if (!userData.email) return <p>Loading user data...</p>;

  return (
    <div>
      <h2>Personal Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="formdiv">
          <div className="inputbox">
            <label>Email</label>
            <input type="email" name="email" className="input" value={user.email} disabled />
          </div>

          <div className="inputbox">
            <label>Name*</label>
            <input type="text" name="name" className="input" value={userData.name || ""} onChange={handleChange} required />
          </div>

          <div className="inputbox">
            <label>Date of Birth*</label>
            <input type="date" name="dob" className="input" value={userData.dob || ""} onChange={handleChange} required />
          </div>

          <div className="inputbox">
            <label>Gender*</label>
            <select name="gender" className="input" value={userData.gender || ""} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="inputbox">
            <label>Mobile Number*</label>
            <input type="tel" name="mobile" className="input" value={userData.mobile || ""} onChange={handleChange} required maxLength={10} minLength={10} />
          </div>

          <div className="inputbox">
            <label>Age*</label>
            <input type="number" name="Age" className="input" value={userData.Age || ""} onChange={handleChange} required min={0} />
          </div>

          <div className="inputbox">
            <label>Nationality*</label>
            <input type="text" name="nationallity" className="input" value={userData.nationallity || ""} onChange={handleChange} required />
          </div>

          <div className="inputbox">
            <label>Country*</label>
            <input type="text" name="country" className="input" value={userData.country || ""} onChange={handleChange} required />
          </div>

          <div className="inputbox">
            <label>State*</label>
            <input type="text" name="state" className="input" value={userData.state || ""} onChange={handleChange} required />
          </div>

          <div className="inputbox">
            <label>Pin/Zip Code*</label>
            <input type="text" name="pin" className="input" value={userData.pin || ""} onChange={handleChange} required maxLength={10} />
          </div>

          <div className="inputbox">
            <label>Address*</label>
            <textarea name="address" className="input" rows={3} value={userData.address || ""} onChange={handleChange} required></textarea>
          </div>
        </div>

        <div>
          <button type="submit" className="btn btn-primary save-personal-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;
