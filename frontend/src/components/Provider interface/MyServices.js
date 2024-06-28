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
  Box,
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
        setDeleteService("deleted");
        setRenderUpdateFunc(renderUpdateFunc + 1);
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
      justifyContent="flex-start"
      alignItems="center"
      mt={4}
    >
      {services &&
        services.map((elem) => {
          return (
            <Card sx={{ minWidth: 350, maxWidth: 350, minHeight: 380,backgroundColor:"#e0e0e0" }} >
              <Stack
                direction="column"
                justifyItems="space-between"
                alignItems="center"
              >
                <CardMedia
                  component="img"
                  height="194"
                  image={elem.image}
                  alt={elem.serviceName}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {elem.serviceName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {elem.description}
                  </Typography>
                  {showInputToUpdate === elem._id && (
                    <Stack spacing={2}>
                      <TextField
                        id="standard-basic"
                        label="Title"
                        variant="standard"
                        onChange={(e) => {
                          setUpdatedTitle(e.target.value);
                        }}
                      />
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
                      <Button
                        variant="contained"
                        onClick={() => {
                          updateTheService(elem._id);
                        }}
                      >
                        save
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setShowInputToUpdate(false);
                        }}
                      >
                        cancel
                      </Button>
                    </Stack>
                  )}
                  <Typography gutterBottom variant="h6" color="text.secondary">
                    {elem.category}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Price:{elem.price}$ per hour
                  </Typography>
                </CardContent>

                <Stack
                  direction="row"
                  useFlexGap
                  gap={5}
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Button
                    variant="contained"
                    onClick={() => {
                      ShowUpdateInputs(elem._id);
                    }}
                  >
                    update
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      Delete(elem._id);
                    }}
                  >
                    delete
                  </Button>
                </Stack>
              </Stack>
            </Card>
          );
        })}
    </Stack>
  );
};

export default Services;
