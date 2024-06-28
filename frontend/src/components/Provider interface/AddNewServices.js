import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import {
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Container,
} from "@mui/material/";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { MuiFileInput } from "mui-file-input";

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
      });
  };
  const upload = () => {
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
        console.log(data.url);
      })
      .catch((err) => console.log(err));
  };
  ///

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      mt={5}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundColor: "#e0e0e0",
          marginTop: "50px",
          borderRadius: "12px",
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          mt={3}
        >
          <TextField
            margin="normal"
            required
            id="serviceName"
            label="Service name"
            name="serviceName"
            autoComplete="serviceName"
            autoFocus
            onChange={(e) => {
              setNewServiceName(e.target.value);
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
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          mt={3}
        >
          <TextField
            type="file"
            variant="outlined"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ width: "300px" }}
          />

          <Button
            component="label"
            variant="contained"
            tabIndex={-1}
            onClick={upload}
            startIcon={<CloudUploadIcon />}
          >
            upload
          </Button>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          mt={3}
          mb={3}
        >
          <FormControl sx={{ m: 3, minWidth: 180 }}>
            <InputLabel id="select">Select Your Field:</InputLabel>
            <Select
              labelId="select"
              id="select"
              value={serviceField}
              label="Select Your Field:"
              onChange={(e) => setServiceField(e.target.value)}
            >
              {allFields &&
                allFields.map((element) => {
                  return (
                    <MenuItem value={element.fieldName}>
                      {element.fieldName}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>

          <TextField
            id="outlined-number"
            label="Price Per Hour"
            type="number"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </Stack>
        <Button variant="contained" onClick={addService} mb={3}>
          ADD SERVICE
        </Button>
      </Container>
    </Stack>
  );
};

export default AddService;
