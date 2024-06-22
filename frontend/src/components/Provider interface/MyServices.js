import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { Button, Card,ListGroup,Stack } from "react-bootstrap";

const Services = () => {
  const user = useContext(UserContext);
  const [deleteService, setDeleteService] = useState();

  const Delete = (e) => {
    axios
      .delete(`http://localhost:5000/services/${e.target.id}`, {
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
  const ShowUpdateInputs = (e) => {
    setShowInputToUpdate(e.target.id);
  };
  const [updateTitle, setUpdatedTitle] = useState();
  const [updatedDescription, setUpdatedDescription] = useState();
  const [renderUpdateFunc, setRenderUpdateFunc] = useState(0);
  const updateTheService = (e) => {
    console.log(e.target.id);
    axios
      .put(
        `http://localhost:5000/services/${e.target.id}`,
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
    <Stack direction="horizontal" gap={3} style={{display:"flex",flexDirection:"row",wrap:true}}>
      {services &&
        services.map((elem) => {
          return (
            <Card style={{ width: "24rem" }}>
              <Card.Img variant="top" src={elem.image} />
              <Card.Body>
                <Card.Title>{elem.serviceName} </Card.Title>
                
                  {showInputToUpdate === elem._id && (
                    <input
                      placeholder="Title"
                      onChange={(e) => {
                        setUpdatedTitle(e.target.value);
                      }}
                    />
                  )}
                {" "}
                <Card.Text>
                  description {elem.description}
                  <div>
                    {showInputToUpdate === elem._id && (
                      <input
                        placeholder="description"
                        onChange={(e) => {
                          setUpdatedDescription(e.target.value);
                        }}
                      />
                    )}
                  </div>
                  {showInputToUpdate === elem._id && (
                   <Button variant="secondary" id={elem._id} onClick={updateTheService}>
                      save
                    </Button>
                  )}{" "}
                </Card.Text>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Category :- {elem.category}</ListGroup.Item>{" "}
                  <ListGroup.Item>Price:{elem.price}$ per hour</ListGroup.Item>
                
                <ListGroup.Item>
                  <Button
                    variant="primary"
                    id={elem._id}
                    onClick={ShowUpdateInputs}
                  >
                    update
                  </Button>{"    "}
                  <Button variant="secondary" id={elem._id} onClick={Delete}>
                    delete
                  </Button>
                  </ListGroup.Item>
                  </ListGroup>
              </Card.Body>
            </Card>
          );
        })}
    </Stack>
  );
};

export default Services;
