import axios from "axios";
import React, { useEffect, useState } from "react";

const Services=()=>{
const [services,setService]=useState([])
useEffect(()=>{
axios.get("http://localhost:5000/services/666495eafe7497e5e90667ec") //edit the id to be variable from token 
.then((result)=>{
    console.log('service',result.data.services);
setService(result.data.services)
}).catch((err)=>{

})
},[])
    return(
<div>
{services && services.map(elem=>{
  return  <div>Name :{elem.serviceName}  <p>description {elem.description} </p><p>Category :- {elem.category}</p> <p>Price:{elem.price}$ per hour</p> </div>
})}
</div>
    )
}

export default Services