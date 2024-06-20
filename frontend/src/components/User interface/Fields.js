import axios from "axios";
import React, { useEffect, useState,createContext } from "react";
import { Route,Routes, useNavigate } from "react-router-dom";
import ServicesOfField from "./ServicesOfField";



export const ServiceContext = createContext();

const Fields = () => {
 
  const navigate=useNavigate()
  const [allFields, setAllFields] = useState();
  const [cardId,setCardId]=useState()
  const [isParentVisible,setIsParentVisible]=useState()
  const [loggingId,setLoggingId]=useState()
const goToService=(e)=>{
setCardId(e.target.id)
console.log("hello from get");
navigate("/fields/services")
}
  
  useEffect(() => {
    setIsParentVisible(true)
   
    axios
      .get("http://localhost:5000/fields")
      .then((result) => {
      
        console.log("fromfields",result);
        setAllFields(result.data.fields);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <ServiceContext.Provider value={{cardId,setCardId,allFields, setAllFields,setIsParentVisible,loggingId}}>
      <Routes>
      <Route path="/services" element={<ServicesOfField />} />
      </Routes>
      </ServiceContext.Provider>

      { isParentVisible && allFields &&
        allFields.map((elem) => {
          return (
            <div>
              <div id={elem._id} onClick={goToService} style={{ cursor: "pointer" }}>{elem.fieldName}</div>
              <img src={elem.image} />
              <div>{elem.description}</div>
            </div>
          );
        })}

    </div>
  );
};

export default Fields;
