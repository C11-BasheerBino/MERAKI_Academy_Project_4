import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

const AddService =()=>{
const [newServiceName,setNewServiceName]=useState()
const [description, setDescription] = useState()
const [image, setImage] = useState()
const [serviceField, setServiceField] = useState()
const [price,setPrice]=useState()
const user=useContext(UserContext)
const addService=()=>{
    axios.post("http://localhost:5000/services",{
        providerID:user.loggingId,
        serviceName:newServiceName,
        description:description,
        image:image,
        category:serviceField,
        price:price,}).then((result)=>{
console.log(result)
console.log(user.loggingId);
        }).catch((err)=>{
            console.log(err)
        })
}
    return(
        <div>
            <input type="text" placeholder="Service name" onChange={(e)=>{
                setNewServiceName(e.target.value)
            }}/>
            <input type="text" placeholder="Description" onChange={(e)=>{
                setDescription(e.target.value)
            }}/>
            <input type="text" placeholder="image link" onChange={(e)=>{
                setImage(e.target.value)
            }} />
            <input type="text" placeholder="Service Field" onChange={(e)=>{
                setServiceField(e.target.value)
            }} />
            <input type="number" placeholder="Price Per Hour" onChange={(e)=>{
                setPrice(e.target.value)
            }} />
            <button onClick={addService}>Add Service</button>
        </div>

    )
}


export default AddService