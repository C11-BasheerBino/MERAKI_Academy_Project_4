import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import {
  Stack,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Alert,
} from "@mui/material/";

const ServicesOfField = () => {
  const user = useContext(UserContext);
  const [requestMsg, setRequestMsg] = useState("");
  const [myServiceId, setMyServiceId] = useState("");
  const selectedFieldServices = user.allFields.filter((Element) => {
    return Element._id === user.cardId;
  });

  const sendRequest = (id, providerId) => {
    axios
      .post("http://localhost:5000/requests", {
        providerId: providerId,
        serviceId: id,
        userId: user.loggingId,
      })
      .then((result) => {
        setRequestMsg(result.data.message);
        setMyServiceId(id);
      });
  };

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
      {selectedFieldServices[0].services.map((element) => {
        return (
          <Card sx={{minWidth:345, maxWidth: 345, backgroundColor:"#e0e0e0",borderRadius: "12px" }}>
            <CardMedia
              sx={{ height: 140 }}
              image={element.image}
              title={element.serviceName}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {element.serviceName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {element.description}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                Price : {element.price} per hour
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  sendRequest(element._id, element.providerID);
                }}
              >
                Send Request
              </Button>
              {requestMsg && myServiceId === element._id && (
                <Alert severity="success">{requestMsg}</Alert>
              )}
            </CardContent>
          </Card>
        );
      })}
    </Stack>
  );
};

export default ServicesOfField;
