import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import Rate from "../shared components/Rate";

const UserDashbord = () => {
  const user = useContext(UserContext);
  const [penddingData, setPenddingData] = useState();
  const [acceptedData, setAcceptedData] = useState();
  const [history, setHistory] = useState([]); //build backend get all rqeust then filter it without pendding
  const [rated,setRated]=useState()
  useEffect(() => {
    axios
      .get(`http://localhost:5000/requests/user/${user.loggingId}`)
      .then((result) => {
        console.log(result);
        setPenddingData(
          result.data.services.filter((element) => {
            return element.status === "Pendding";
          })
        );
        setAcceptedData(
          result.data.services.filter((element) => {
            return element.status === "Accepted";
          })
        );
        setHistory(
          result.data.services.filter((element) => {
            return (
              element.status !== "Pendding" && element.status !== "Accepted"
            );
          })
        );
      });
  }, [rated]);


  return (
    <div>
      <div className="sales"></div>
      <div className="pendding">
        {penddingData &&
          penddingData.map((element, i) => {
            return (
              <div>
                {i + 1}- service name:- {element.serviceId.serviceName} status
                :- {element.status}
              </div>
            );
          })}
        {acceptedData &&
          acceptedData.map((element, i) => {
            return (
              <div>
                {i + 1}- service name:- {element.serviceId.serviceName} status
                :- {element.status}
              </div>
            );
          })}
        {history &&
          history.map((element, i) => {
            return (
              <div>
                {i + 1}- service name:- {element.serviceId.serviceName} status
                :- {element.status}
                <div>
              
                  
                  {element.status === "Finished" &&  !rated && ( 
                    <div>
                    <p>Rate the worker{" "}</p>
                    <div> price ={(element.finishTime - element.startTime)*element.serviceId.price} $ </div>
                    <Rate
                    onUpdateSucceed = {()=>{
                      console.log(element._id)
setRated("Rated")
axios.put(`http://localhost:5000/requests/${element._id}`,{ status: "Finished and Rated" }).then((result)=>{
  console.log(result)
}).catch((err)=>{
  console.log(err)
})
                      
                      // copy state acceptedData
                      // loop state to find elem id === element.id
                      // change the status to rated
                      // setAcceptedData
                    }}
                      collection={{
                        providerId: element.providerId,
                        userId: element.userId._id,
                      }}
                    /></div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UserDashbord;
