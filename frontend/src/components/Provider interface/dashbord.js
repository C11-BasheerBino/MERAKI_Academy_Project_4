import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

const Dashbord = () => {
  const user = useContext(UserContext)
    const [penddingData,setPenddingData]=useState()
    const [history,setHistory]=useState([])//build backend get all rqeust then filter it without pendding
    useEffect(()=>{
axios.get(`http://localhost:5000/requests/provider/${user.loggingId}`).then( (result)=>{
    console.log(result)
    result.data.services && setPenddingData(result.data.services.filter(element=>{return element.status==='Pendding'}))
    result.data.services && setHistory(result.data.services.filter(element=>{return element.status!=='Pendding'}))
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