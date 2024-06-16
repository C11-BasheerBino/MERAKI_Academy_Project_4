import axios from "axios";
import React, { useEffect, useState } from "react";

const Services = () => {
    const [deleteService, setDeleteService] = useState();

    const Delete = (e) => {
        axios
          .delete(`http://localhost:5000/services/${e.target.id}`)
          .then((result) => {
            console.log("hello from delete", result.data);
            setDeleteService("deleted");
          })
          .catch((err) => {
            console.log(err.message);
          });
      };

  const [showInputToUpdate, setShowInputToUpdate] = useState(false);
  const ShowUpdateInputs = () => {
    setShowInputToUpdate(true);
  };
  const [updateTitle, setUpdatedTitle] = useState();
  const [updatedDescription, setUpdatedDescription] = useState();
const [renderUpdateFunc,setRenderUpdateFunc]=useState(0)
  const updateTheService = (e)=>{
    console.log(e.target.id);
    axios.put(
        `http://localhost:5000/services/${e.target.id}`,
        {serviceName: updateTitle, description: updatedDescription }
      )
      .then((result) => {
        setShowInputToUpdate(false);
        setRenderUpdateFunc(renderUpdateFunc+1);
        console.log(result.data.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  

  const [services, setService] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/services/666495eafe7497e5e90667ec") //edit the id to be variable from token
      .then((result) => {
        console.log("service", result.data.services);
        setService(result.data.services);
      })
      .catch((err) => {});
  }, [renderUpdateFunc,deleteService]);

  return (
    <div>
      {services &&
        services.map((elem) => {
          return (
            <div>
              Name :{elem.serviceName}{" "}
              <div>
                {showInputToUpdate && (
                  <input
                    placeholder="Title"
                    onChange={(e) => {
                      setUpdatedTitle(e.target.value);
                    }}
                  />
                )}
              </div>{" "}
              <p>
                description {elem.description}
                <div>
                  {showInputToUpdate && (
                    <input
                      placeholder="description"
                      onChange={(e) => {
                        setUpdatedDescription(e.target.value);
                      }}
                    />
                  )}
                </div>
                {showInputToUpdate && <button id={elem._id} onClick={updateTheService}>save</button>}{" "}
              </p>
              <p>Category :- {elem.category}</p>{" "}
              <p>Price:{elem.price}$ per hour</p>
              <div>
                <button onClick={ShowUpdateInputs}>update</button>
                <button id={elem._id} onClick={Delete}>delete</button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Services;
