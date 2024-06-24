import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import {
  Stack,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material/";

const AddService = () => {
  const [allFields, setAllFields] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:5000/fields")
      .then((result) => {
        setAllFields(result.data.fields);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [newServiceName, setNewServiceName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [serviceField, setServiceField] = useState();
  const [price, setPrice] = useState();
  const user = useContext(UserContext);
  const addService = () => {
    
    axios
      .post("http://localhost:5000/services", {
        providerID: user.loggingId,
        serviceName: newServiceName,
        description: description,
        image: imgUrl,
        category: serviceField || "Electrical",
        price: price,
      })
      .then((result) => {
        console.log(result);
        console.log(user.loggingId);
      })
      .catch((err) => {
        console.log(err);
      });}
const upload = ()=>{
  const data = new FormData();
  data.append("file", image);
  console.log(image);
  data.append("upload_preset", "maintain solutions");
  data.append("cloud_name", "dkr5xxdly");
  fetch("https://api.cloudinary.com/v1_1/dkr5xxdly/image/upload", {
    method: "post",
    body: data,
  })
    .then((resp) => resp.json())
    .then((data) => {
      setImgUrl(data.url);
    })
    .catch((err) => console.log(err));

}
    ///
  
  return (
    <Stack
  justifyContent="center"
  alignItems="center"
  spacing={2}
  mt={4}
>
      <input
        type="text"
        placeholder="Service name"
        onChange={(e) => {
          setNewServiceName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      
      
    
      
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])} style={{width:"300px"}}
          />
    
          <button  onClick={upload}>upload</button>
        
      

      <label>
        Select Your Field:
        <select
          value={serviceField}
          onChange={(e) => setServiceField(e.target.value)}
        >
          {allFields &&
            allFields.map((element) => {
              return (
                <option value={element.fieldName}>{element.fieldName}</option>
              );
            })}
        </select>
      </label>
      <input
        type="number"
        placeholder="Price Per Hour"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <button onClick={addService}>Add Service</button>
      </Stack>
  );
};

export default AddService;
