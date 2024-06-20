import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import Rate from "../shared components/Rate";

const UserDashbord = () => {
  const user = useContext(UserContext);
  const [penddingData, setPenddingData] = useState();
  const [acceptedData, setAcceptedData] = useState();
  const [history, setHistory] = useState([]); //build backend get all rqeust then filter it without pendding
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
  }, []);

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
                  Rate the worker{" "}
                  {element.status === "Finished" && (
                    <Rate
                      collection={{
                        providerId: element.providerId,
                        userId: element.userId._id,
                      }}
                    />
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
