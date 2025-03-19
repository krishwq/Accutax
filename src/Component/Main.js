import React, { useState,useContext } from "react";
import "./Css/Main.css";
import TaxContext from "../Context/Tax/TaxContext";

function Main() {
  const {calculate_tax,setisloading}=useContext(TaxContext);
  const [income, setIncome] = useState("");
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("Home Loan");
  const [deductiondoc, setdeductiondoc] = useState("");
  const [totaltax, settotaltax] = useState(0);
  const [answer, setanswer] = useState([]);
  const [taxableincome, settaxableincome] = useState("");
  const [values, setValues] = useState({
    "Home Loan": "",
    PPF: "",
    "Fixed Deposit": "",
    Medical: "",
    "Tuition Fees": "",
    Pension: "",
    HRA: "",
    Charitable: "",
    Others: "",
  });

  const [isdisable, setisdisable] = useState({
    "Home Loan": false,
    PPF: false,
    "Fixed Deposit": false,
    Medical: false,
    "Tuition Fees": false,
    Pension: false,
    HRA: false,
    Charitable: false,
    Others: false,
  });
  const [document, setdocument] = useState("");
  const [summery, setsummery] = useState("");
  const typeofincome = {
    "Home Loan": "loans",
    PPF: "loans",
    "Fixed Deposit": "fds",
    Medical: "inv",
    "Tuition Fees": "fds",
    Pension: "inv",
    HRA: "inv",
    Charitable: "inv",
    Others: "",
  };
  const [typeOfIncomeUsed, settypeOfIncomeUsed] = useState({
    loans: 0,
    inv: 0,
    fds: 0,
  });
  const categories = Object.keys(values);

  const handleChange = (e) => {
    setValues({ ...values, [category]: e.target.value });
  };

  const handleStep = (direction) => {
    setStep((prev) => Math.max(1, Math.min(4, prev + direction)));
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    handleStep(1);
  };
  const handlesubmit2 = async (e) => {
    e.preventDefault();
    setisdisable({ ...isdisable, [category]: true });
    if (values[category] !== 0 && typeofincome[category] !== "") {
      const question = `Total annual income : ${income} yearly ${category} interest paid : ${values[category]} Query: What is the final taxable income after al possible deduction deduction?`;
      const incomecategory = typeofincome[category];
      if (typeOfIncomeUsed[incomecategory] === 0) {
        settypeOfIncomeUsed({ ...typeOfIncomeUsed, [incomecategory]: 1 });
        try {
          const response = await fetch("http://localhost:8000/result", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question, incomecategory }),
          });

          const res=await response.json();
          let answer = deductiondoc + res.tax;
          setdeductiondoc(answer);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
  };
  const onfinalsubmit = async () => {
    setStep(5);
    if (deductiondoc === "") {
      setisloading(true);
      setTimeout(() => {
        setisloading(false);
      }, 2000);
        let totalTax = calculate_tax(income);
        settotaltax(totalTax);
    } else {
      setisloading(true);
      const finalQuestion = `Total annual income: ${income} 
        ${Object.entries(values)
          .filter(([category, amount]) => amount > 0) 
          .map(
            ([category, amount]) =>
              `Yearly ${category} amount: ${amount}`
          )
          .join("\n")}
        Query: What is the final taxable income after all possible deduction deduction?`;
      try {
        const response = await fetch(
          "http://localhost:8000/caculatededuction",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ finalQuestion, deductiondoc }),
          }
        );
        let totalTaxableincome = await response.json();
        setanswer(totalTaxableincome.answer.split("\n"));
        console.log(totalTaxableincome)
        console.log(totalTaxableincome.answer)
        settaxableincome(totalTaxableincome.taxableincome);
          let totalTax = calculate_tax(totalTaxableincome.taxableincome);
          settotaltax(totalTax);
          setisloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <>
    {step !==5 && (<>
    <div>
      <h1 className="heading-main">Fill Your Tax With Accutax</h1>
      <div className="progress-bar">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className={`step ${num <= step ? "active" : ""}`}>
            {num}
          </div>
        ))}
      </div>
      <div className="main-cont">
        {step === 1 && (
          <>
            <h2 className="main-cont-heading">Income Information</h2>
            <div>
              <form onSubmit={handleSubmit1}>
                <label htmlFor="income">Your Annual Income:</label>
                <input
                  type="number"
                  min={0}
                  id="income"
                  className="form-control"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="Enter your annual income"
                  required
                />
                <button type="submit" className="btn btn-info btn-save">
                  Save
                </button>
              </form>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="main-cont-heading">Deduction Details</h2>
            <div className="main-step-2-parent">
              <div className="main-step-2-child-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    style={{ backgroundColor: values[cat] ? "#A6F6FF" : "" }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="main-step-2-child-2">
                <form onSubmit={handlesubmit2}>
                  <label htmlFor={category}>{`${category} Amount:`}</label>
                  <input
                    type="number"
                    min={0}
                    id={category}
                    className="form-control"
                    value={values[category]}
                    onChange={handleChange}
                    placeholder={`${category} Amount`}
                    disabled={isdisable[category]}
                  />
                  <button className="btn btn-info btn-save">Save</button>
                </form>
              </div>
            </div>
            <div className="stepchange-cont">
              <button
                className="btn btn-info btn-back"
                onClick={() => handleStep(-1)}
              >
                Back
              </button>
              <button
                className="btn btn-info btn-next"
                onClick={() => {
                  let requiredDocs = new Set();
                  let requiresummey = new Set();
                  if (income > 0) {
                    requiredDocs.add("Income Proof");
                  }
                  if (values["Home Loan"] > 0) {
                    requiredDocs.add("Home Loan Documents");
                    requiresummey.add("Home Loan");
                  }
                  if (values["PPF"] > 0) {
                    requiredDocs.add("PPF Documents");
                    requiresummey.add("PPF");
                  }
                  if (values["Fixed Deposit"] > 0) {
                    requiredDocs.add("Fixed Deposit Proof");
                    requiresummey.add("Fixed Deposit");
                  }
                  if (values["Medical"] > 0) {
                    requiredDocs.add("Medical Receipts");
                    requiresummey.add("Medical");
                  }
                  if (values["Tuition Fees"] > 0) {
                    requiredDocs.add("Tuition Fee Receipts");
                    requiresummey.add("Tuition Fees");
                  }
                  if (values["Pension"] > 0) {
                    requiredDocs.add("Pension Proof");
                    requiresummey.add("Pension");
                  }
                  if (values["HRA"] > 0) {
                    requiredDocs.add("HRA Proof");
                    requiresummey.add("HRA");
                  }
                  if (values["Charitable"] > 0) {
                    requiredDocs.add("Donation Receipts");
                    requiresummey.add("Charitable");
                  }
                  if (values["Others"] > 0) {
                    requiresummey.add("Others");
                  }
                  setdocument(Array.from(requiredDocs));
                  setsummery(Array.from(requiresummey));
                  handleStep(1);
                }}
              >
                Next
              </button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h2 className="main-cont-heading">Upload Your Documents</h2>
            <div className="main-step-3">
              {document.map((doc, index) => (
                <div key={index} className="document-cont">
                  <label>{doc}</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id={`document-${index}`}
                  />
                </div>
              ))}
            </div>
            <div className="stepchange-cont">
              <button
                className="btn btn-info btn-back"
                onClick={() => handleStep(-1)}
              >
                Back
              </button>
              <button
                className="btn btn-info btn-submit"
                onClick={() => handleStep(1)}
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="main-cont-heading">Summery</h2>
            <div className="main-step-3">
              <div className="document-cont step-4">
                <h5>Total annual income:</h5>
                <p>{income}</p>
              </div>
              {summery.map((sum, index) => (
                <div key={index} className="document-cont step-4">
                  <h5>{sum} Amount:</h5>
                  <p>{values[sum]}</p>
                </div>
              ))}
            </div>
            <div className="stepchange-cont">
              <button
                className="btn btn-info btn-back"
                onClick={() => handleStep(-1)}
              >
                Back
              </button>
              <button
                className="btn btn-info btn-submit"
                onClick={onfinalsubmit}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
    </>
    )}
        {step===5 && (
          <div className="main-result-parent">
            <div className="main-result-child1">
              <div className="congrats">
                 <h3 className="my-2">Congratulation!</h3>
                 <h4><span>You Saved</span><br /><span> ₹{calculate_tax(income)-totaltax}/- </span></h4>
              </div>
              <div className="details">
                  <h3>Your income : ₹{income}/-</h3>
                  <h3>Your Taxable income : ₹{taxableincome?taxableincome:income}/-</h3>
                  <h3>Total Payable Tax : ₹{totaltax}/- </h3>
              </div>
            </div>
            <div className="main-result-child2">
              <div className="description">
                <ul>
                {
  answer
    .filter(ans => ans !== "")
    .map(ans => <li key={ans}>{ans}</li>)
}
                 </ul>
              </div>
            </div>
          </div>
        )}
</>
  );
}

export default Main;
