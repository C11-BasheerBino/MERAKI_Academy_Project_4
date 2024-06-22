import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { Button } from "react-bootstrap";

const Dashbord = () => {
  const user = useContext(UserContext);
  const [updateStatus, setUpdateStatus] = useState();
  const [penddingData, setPenddingData] = useState();
  const [accpeted, setAccepted] = useState();
  const [finished,setFinished] =useState()
  const [history, setHistory] = useState([]); //build backend get all rqeust then filter it without pendding
  const [startTime, setStartTime] = useState();
  const [finishTime, setFinishTime] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/requests/provider/${user.loggingId}`)
      .then((result) => {
        console.log(result.data.services);
        result.data.services &&
          setPenddingData(
            result.data.services.filter((element) => {
              return element.status === "Pendding";
            })
          );

        setAccepted(
          result.data.services.filter((element) => {
            return element.status === "Accepted";
          })
        );

        setFinished(result.data.services.filter((element) => {
          return element.status === "Finished";
        }))

        result.data.services &&
          setHistory(
            result.data.services.filter((element) => {
              return (
                element.status !== "Pendding" && element.status !== "Accepted"
              );
            })
          );
      });
  }, [updateStatus,finishTime]);
  const Accept = (id) => {
    setUpdateStatus("Accepted");

    axios
      .put(`http://localhost:5000/requests/${id}`, {
        status: "Accepted",
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Reject = (e) => {
    setUpdateStatus("Rejected");

    axios
      .put(`http://localhost:5000/requests/${e.target.id}`, {
        status: "Rejected",
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStartTime = (id) => {
    const time = new Date();

    const totalHours = time.getHours() + time.getMinutes() / 60;
    console.log(totalHours);
    setStartTime(totalHours);

    axios.put(`http://localhost:5000/requests/time/${id}`,{startTime:totalHours}).then((result)=>{
      console.log(result)
    }).catch((err)=>{
      console.log(err)
    })
  };
  const getFinishTime = (id) => {
    const time = new Date();

    const totalHours = time.getHours() + time.getMinutes() / 60;
    console.log(totalHours);
    setFinishTime(totalHours);
    axios.put(`http://localhost:5000/requests/time/${id}`,{finishTime:totalHours}).then((result)=>{
      console.log(result)
    }).catch((err)=>{
      console.log(err)
    })


    axios
    .put(`http://localhost:5000/requests/${id}`, {
      status: "Finished",
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });


  };

 
  return (
    <div>
      <div className="sales"></div>
      <div className="pendding">
        {penddingData &&
          penddingData.map((element, i) => {
            return (
              <div>
                {i + 1}- service name:- {element.serviceId.serviceName} status
                :- {element.status}{" "}
                <Button variant="primary" onClick={()=>{
                  Accept(element._id)
                }} id={element._id}>
                  Accept
                </Button>{" "}
                <Button variant="danger" onClick={Reject} id={element._id}>
                  X
                </Button>{" "}
              </div>
            );
          })}
        {accpeted &&
          accpeted.map((element, i) => {
            return (
              <div>
                {i + 1}- service name:- {element.serviceId.serviceName} status
                :- {element.status}{" "}
                {!startTime ? (
                  <button onClick={()=>{
                    getStartTime(element._id)
                  }}>start</button>
                ) :  (
                  <button onClick={()=>{
                    getFinishTime(element._id)
                  }}>Finish</button>
                 
                 
                )}
              </div>
            );
          })}
 {finished &&
          finished.map((element, i) => {
            return (
              <div>
                {i + 1}- service name:- {element.serviceId.serviceName} status
                :- {element.status} 
                <div >
                    {" "}
                    {Math.trunc(finishTime - startTime)} hours{" "}
                    {Math.trunc(
                      (finishTime -
                        startTime -
                        Math.trunc(finishTime - startTime)) *
                        60
                    )}{" "}
                    minutes{" "}
                  </div>
              </div>
            );
          })}
        {history &&
          history.map((element, i) => {
            return (
              <div>
                {i + 1}- service name:- {element.serviceId.serviceName} status
                :- {element.status}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Dashbord;
