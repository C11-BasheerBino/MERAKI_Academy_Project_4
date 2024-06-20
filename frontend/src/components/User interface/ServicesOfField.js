import React, { useContext, useEffect } from "react";
import { ServiceContext } from "./Fields";
import axios from "axios";
import { UserContext } from "../../App";

const ServicesOfField = () => {
  const services = useContext(ServiceContext);
  const user = useContext(UserContext);
  const selectedFieldServices = services.allFields.filter((Element) => {
    return Element._id === services.cardId;
  });
  console.log("hello from services", selectedFieldServices);
  useEffect(() => {
    services.setIsParentVisible(false);
  }, []);

  const sendRequest = (e) => {
    const [id, providerId] = e.target.id.split(" ");
    console.log(user.loggingId)
    axios
      .post("http://localhost:5000/requests", {
        providerId: providerId,
        serviceId: id,
        userId: user.loggingId,
      })
      .then((result) => {
        console.log(result);
      });
    /*axios.get(`http://localhost:5000/services/oneService/${e.target.id}`).then((result)=>{
 
  const service = result.data.services
  console.log("my",service);
  axios.post("http://localhost:5000/requests",{
    providerId:service.providerId
    serviceId
  })
})*/
  };

  return (
    <div>
      {selectedFieldServices[0].services.map((element) => {
        return (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div>Title : {element.serviceName}</div>
            <img
              src={element.image}
              alt={"picture of " + element.serviceName}
            />
            <div>Description : {element.description}</div>
            <div>Price : {element.price} per hour</div>
            <button
              id={element._id + " " + element.providerID}
              onClick={sendRequest}
            >
              Send Request
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ServicesOfField;
