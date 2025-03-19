import { useState } from "react";
import TaxContext from "./TaxContext";
const TaxState = (props) => {
    const calculate_tax = (x) => {
        if (x <= 250000) {
            return 0;
        } else if (x > 250000 && x <= 500000) {
            return (x - 250000) * 0.05;
        } else if (x > 500000 && x <= 1000000) {
            return (x - 500000) * 0.2 + 12500;
        } else if (x > 1000000 && x <= 5000000) {
            return (x - 1000000) * 0.3 + 112500;
        } else if (x > 5000000 && x <= 10000000) {
            return (x - 5000000) * 0.3 + 1112500;
        } else if (x > 10000000 && x <= 20000000) {
            return (x - 10000000) * 0.3 + 4112500;
        } else if (x > 20000000 && x <= 50000000) {
            return (x - 20000000) * 0.3 + 7112500;
        } else {
            return (x - 50000000) * 0.3 + 16112500;
        }
    };
    const [isloading, setisloading] = useState(false);


    return(
        <TaxContext.Provider value={{calculate_tax,isloading,setisloading}}>
            {props.children}
        </TaxContext.Provider>
    )
}

export default TaxState;