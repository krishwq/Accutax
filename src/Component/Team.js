import React from "react";
import "./Css/Team.css";
import Card from "./Card";
import amit from "./images/amit.webp";
import ananya from "./images/ananya.webp";
import neha from "./images/neha.webp";
import priya from "./images/priya.webp";
import rahul from "./images/Rahul.webp";
import sanjay from "./images/sanjay.webp";

function Team() {
  return (
    <>
      <h1 className="team-heading">Meet with Our Team</h1>
      <div className="team-container">
      <Card name="Rahul Mehta" designation="Senior Auditor" email="rahul.mehta@firm.com" mobile="+91 98765 43210" url={rahul} />
<Card name="Priya Sharma" designation="Tax Consultant" email="priya.sharma@firm.com" mobile="+91 87654 32109" url={priya} />
<Card name="Amit Verma" designation="Financial Analyst" email="amit.verma@firm.com" mobile="+91 76543 21098" url={amit} />
<Card name="Neha Kapoor" designation="Corporate Accountant" email="neha.kapoor@firm.com" mobile="+91 65432 10987" url={neha} />
<Card name="Sanjay Patil" designation="Forensic Accountant" email="sanjay.patil@firm.com" mobile="+91 54321 09876" url={sanjay} />
<Card name="Ananya Iyer" designation="Business Advisory Consultant" email="ananya.iyer@firm.com" mobile="+91 43210 98765" url={ananya} />
      </div>
    </>
  );
}

export default Team;
