import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashbord = () => {
    const [penddingData,setPenddingData]=useState()
    const [history,setHistory]=useState([])//build backend get all rqeust then filter it without pendding
    useEffect(()=>{
axios.get("http://localhost:5000/requests/").then( (result)=>{
    console.log(result)
    setPenddingData(result.data.services.filter(element=>{return element.status==='Pendding'}))
    setHistory(result.data.services.filter(element=>{return element.status!=='Pendding'}))
})
    },[])
  return (
    <div>
      <div className="sales"></div>
      <div className="pendding">
        {penddingData&&penddingData.map((element,i) => {
            return (<div>{i+1}- service name:- {element.serviceId.serviceName}   status :-  {element.status}</div>)
            
        })}
         {history&&history.map((element,i) => {
            return (<div>{i+1}- service name:- {element.serviceId.serviceName}   status :-  {element.status}</div>)
            
        })}

      </div>
    </div>
  );
};

export default Dashbord