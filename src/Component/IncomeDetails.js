import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function IncomeDetails() {
  const { user } = useAuth0();
  const [userData, setUserData] = useState({
    email:"",
    occupation: "",
    income: "",
    companyname: "",
    sourceofincome: "",
    taxnumber: "",
    salaryslip: "",
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
        console.log(json);
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

  if (!userData) return <p>Loading user data...</p>;

  return (
    <div>
      <h2>Income Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="formdiv">
          <div className="inputbox">
            <label>Occupation<span style={{ color: "red" }}>*</span></label>
            <input type="text" name="occupation" required className="input" value={userData.occupation} onChange={handleChange} />
          </div>

          <div className="inputbox">
            <label>Annual Income<span style={{ color: "red" }}>*</span></label>
            <input type="number" name="income" required min={0} className="input" value={userData.income} onChange={handleChange} />
          </div>

          <div className="inputbox">
            <label>Source of Income<span style={{ color: "red" }}>*</span></label>
            <select name="sourceofincome" required className="input" value={userData.sourceofincome} onChange={handleChange}>
              <option value="">Select</option>
              <option value="salary">Salary</option>
              <option value="business">Business</option>
              <option value="freelance">Freelance</option>
              <option value="investments">Investments</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="inputbox">
            <label>Employer/Company Name<span style={{ color: "red" }}>*</span></label>
            <input type="text" name="companyname" className="input" value={userData.companyname} onChange={handleChange} />
          </div>

          <div className="inputbox">
            <label>Tax Identification Number</label>
            <input type="text" name="taxnumber" className="input" value={userData.taxnumber} onChange={handleChange} />
          </div>

          <div className="inputbox">
            <label>Upload Salary Slip</label>
            <input type="file" name="salaryslip" className="input" onChange={handleChange} />
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-primary save-personal-btn">Save</button>
        </div>
      </form>
    </div>
  );
}

export default IncomeDetails;
