import axios from "axios";
import React, { useEffect, useState, createContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ServicesOfField from "./ServicesOfField";
import {
  Stack,
  Link,
  ThemeProvider,
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material/";

export const ServiceContext = createContext();

const Fields = () => {
  const navigate = useNavigate();
  const [allFields, setAllFields] = useState();
  const [cardId, setCardId] = useState();
  const [isParentVisible, setIsParentVisible] = useState();
  const [loggingId, setLoggingId] = useState();
  const goToService = (id) => {
    setCardId(id);
    console.log("hello from get");
    navigate("/fields/services");
  };

  useEffect(() => {
    setIsParentVisible(true);

    axios
      .get("http://localhost:5000/fields")
      .then((result) => {
        console.log("fromfields", result);
        setAllFields(result.data.fields);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
   <div>
      <ServiceContext.Provider
        value={{
          cardId,
          setCardId,
          allFields,
          setAllFields,
          setIsParentVisible,
          loggingId,
        }}
      >
        <Routes>
          <Route path="/services" element={<ServicesOfField />} />
        </Routes>
      </ServiceContext.Provider>

      <Stack spacing={{ xs: 2, sm: 4 }} direction="row" useFlexGap flexWrap="wrap" justifyContent="center" alignItems="center" mt={4}>
      {isParentVisible &&
        allFields &&
        allFields.map((elem) => {
          return (
            
         
            <Card sx={{ maxWidth: 345 }}>
              
              <CardMedia
                sx={{ height: 140 }}
                image={elem.image}
                title={elem.fieldName}
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div" onClick={()=>{
                  goToService(elem._id)
                }}
                style={{ cursor: "pointer" }}>
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
        
    </div>
  );
};

export default Fields;
