import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import {
    Stack,
    TextField,
    Button,
    Container,
    Alert,
  } from "@mui/material/";
  import  CheckIcon  from "@mui/icons-material/Check";


const CreateField = ()=>{
    const[fieldName,setFieldName]=useState()
    const[description,setDescription]=useState()
    const[imgUrl,setImgUrl]=useState()
    const[fieldMsg,setFieldMsg]=useState()

    const addNewField = () => {
        axios
          .post("http://localhost:5000/fields", {
        fieldName,
        description,
        image:imgUrl
          })
          .then((result) => {
            console.log(result)
            setFieldMsg(result.data.message)
          })
          .catch((err) => {
            console.log(err);
          });
      };

    return(
<Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      
    >
        
        <TextField
            margin="normal"
            required
            id="fieldeName"
            label="field name"
            name="fieldeName"
            autoComplete="fieldeName"
            autoFocus
            onChange={(e) => {
                setFieldName(e.target.value);
            }}
          />

<TextField
            margin="normal"
            required
            id="standard-multiline-static-textarea"
            multiline
            rows={4}
            label="Description"
            autoFocus
            variant="standard"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
<TextField
            margin="normal"
            required
            id="img Url"
            label="image Url"
            name="imgUrl"
            autoFocus
            onChange={(e) => {
                setImgUrl(e.target.value);
            }}
          />

<Button variant="contained"  onClick={addNewField} mb={3}>
          ADD Field
        </Button>
        {fieldMsg=== "new field card created successfully" &&<Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
 {fieldMsg}
</Alert>}




    </Stack>
    )
}


export default CreateField;
