import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import {  useNavigate } from "react-router-dom";

import {
  Stack,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material/";
import { UserContext } from "../../App";


const Fields = () => {
  const user = useContext(UserContext);

  const navigate = useNavigate();
  const goToService = (id) => {
    user.setCardId(id);
   
    navigate("/fields/services");
  };

  useEffect(() => {
    

    axios
      .get("http://localhost:5000/fields")
      .then((result) => {
        
        user.setAllFields(result.data.fields);
      })
      .catch((err) => {
       
      });
  }, []);

  return (

      <Stack
        spacing={{ xs: 2, sm: 4 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        mt={4}
      >
        {
          user.allFields &&
          user.allFields.map((elem) => {
            return (
              <Card sx={{ maxWidth: 345, minWidth:345, minHeight:350}}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={elem.image}
                  title={elem.fieldName}
                />

                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    onClick={() => {
                      goToService(elem._id);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {elem.fieldName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {elem.description}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
      </Stack>

  );
};

export default Fields;
