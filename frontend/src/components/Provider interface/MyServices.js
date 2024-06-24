import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
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



const Services = () => {
  const user = useContext(UserContext);
  const [deleteService, setDeleteService] = useState();

  const Delete = (id) => {
    axios
      .delete(`http://localhost:5000/services/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((result) => {
        console.log("hello from delete", result.data);
        setDeleteService("deleted");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [showInputToUpdate, setShowInputToUpdate] = useState(false);
  const ShowUpdateInputs = (id) => {
    setShowInputToUpdate(id);
  };
  const [updateTitle, setUpdatedTitle] = useState();
  const [updatedDescription, setUpdatedDescription] = useState();
  const [renderUpdateFunc, setRenderUpdateFunc] = useState(0);
  const updateTheService = (id) => {
 
    axios
      .put(
        `http://localhost:5000/services/${id}`,
        { serviceName: updateTitle, description: updatedDescription },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((result) => {
        setShowInputToUpdate(false);
        setRenderUpdateFunc(renderUpdateFunc + 1);
        console.log(result.data.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [services, setService] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/services/${user.loggingId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }) //edit the id to be variable from token
      .then((result) => {
        console.log("service", result.data.services);
        setService(result.data.services);
      })
      .catch((err) => {});
  }, [renderUpdateFunc, deleteService]);

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
      {services &&
        services.map((elem) => {
          return (
            <Card sx={{ maxWidth: 345 }}>
               <CardMedia
                  sx={{ height: 140 }}
                  image={elem.image}
                  title={elem.serviceName}
                />
             <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                  {elem.serviceName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {elem.description}
                  </Typography>
                {showInputToUpdate === elem._id && (<Stack spacing={2}>
                    <TextField id="standard-basic" label="Title" variant="standard" 
                      onChange={(e) => {
                        setUpdatedTitle(e.target.value);
                      }  }/>  
                     <TextField
          id="standard-multiline-static"
          label="Description"
          multiline
          rows={4}
          defaultValue=""
          variant="standard"
                        onChange={(e) => {
                          setUpdatedDescription(e.target.value);
                        }}
                      />
                     <Button variant="contained"  onClick={()=>{
                        updateTheService(elem._id)
                      }}>
                      save
                    </Button>
                    <Button variant="outlined" onClick={()=>{
                      setShowInputToUpdate(false)

                    }}>cancel</Button>
                      </Stack>)
                      
                      }
                    <Typography variant="body2" color="text.secondary">
                    {elem.category}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                  Price:{elem.price}$ per hour
                  </Typography>


                                </CardContent>

                 <Button variant="contained"
                   
                    onClick={()=>{
                      ShowUpdateInputs(elem._id)
                    }}
                  >
                    update
                  </Button>{"    "}
                  
                 < Button variant="outlined"    onClick={()=>{
                  Delete(elem._id)
                 }}>
                    delete
                  </Button>
                  
              
            </Card>
          );
        })}
    </Stack>
  );
};

export default Services;
