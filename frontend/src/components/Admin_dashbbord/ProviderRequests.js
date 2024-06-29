import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Stack,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Select,
  FormControl,
  Button,
  InputLabel
  
} from "@mui/material/";

const ProviderRequest = () => {
  const [showStatus, setShowStatus] = useState('');
  const showSelector = (e) => {
    setShowStatus(e.target.id);
  };
  const [selectedStatus, setSelectedStatus] = useState("");
  const [renderUpdateStatus, setRenderUpdateStatus] = useState(0);
  const updateStatus = (e) => {
    axios
      .put(`http://localhost:5000/providers/${e.target.id}`, {
        status: selectedStatus,
      })
      .then((result) => {
        setShowStatus(false);
        setRenderUpdateStatus(renderUpdateStatus + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [penddingProviders, setPenddingProviders] = useState();
  useEffect(() => {
    axios.get("http://localhost:5000/providers").then((result) => {
      setPenddingProviders(result.data.providers);
    });
  }, [renderUpdateStatus]);
  return (
    <Stack
      spacing={{ xs: 2, sm: 4 }}
      direction="row"
      useFlexGap
      flexWrap="wrap"
      justifyContent="flex-start"
      alignItems="center"
      mt={4}
    >
      
        {penddingProviders &&
          penddingProviders.map((element) => {
            return (
              <Card sx={{ minWidth: 220, maxWidth: 220, minHeight: 200,backgroundColor:"#e0e0e0" }} >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  {element.firstName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  {element.status}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                  {element.workField}
                  </Typography>

           
                  <Button
            component="label"
            variant="contained" id={element._id} onClick={showSelector}>Update Status</Button>


 
            
             
             </CardContent>
          

                  {showStatus ===element._id && (          <FormControl sx={{ m: 3, minWidth: 180 }}>

                              <InputLabel id="select">Select New Status:</InputLabel>

                    <Select
                    label="Select new status:"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <MenuItem value="Accepted">Accept</MenuItem>
                      <MenuItem value="Rejected">Reject</MenuItem>
                      <MenuItem value="Pendding">Hold The Request</MenuItem>
                    </Select></FormControl>
                  )}                     

                  {showStatus ===element._id && (
                    <Button variant="outlined" id={element._id} onClick={updateStatus}>
                      save
                    </Button>
                  )}
               
               

              </Card>
            );
          })}
      
    </Stack>
  );
};

export default ProviderRequest;
