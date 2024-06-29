import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

import {Box,Button} from "@mui/material/";
import { DataGrid } from "@mui/x-data-grid";
import CancelIcon from '@mui/icons-material/Cancel';


const Dashbord = () => {
  const user = useContext(UserContext);
  const [updateStatus, setUpdateStatus] = useState();
  const [penddingData, setPenddingData] = useState();
  const [accpeted, setAccepted] = useState();
  const [finished, setFinished] = useState();
  const [history, setHistory] = useState([]); //build backend get all rqeust then filter it without pendding
  const [startTime, setStartTime] = useState();
  const [finishTime, setFinishTime] = useState();
  const [reRenderStatus, setReRenderStatus] = useState();
  const [selectedId, setSelectedId] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/requests/provider/${user.loggingId}`)
      .then((result) => {

        result.data.services &&
          setPenddingData(
            result.data.services.filter((element) => {
              return element.status === "Pendding";
            })
          );

          result.data.services && setAccepted(
          result.data.services.filter((element) => {
            return element.status === "Accepted";
          })
        );

        result.data.services && setFinished(
          result.data.services.filter((element) => {
            return element.status === "Finished";
          })
        );

        result.data.services &&
          setHistory(
            result.data.services.filter((element) => {
              return (
                element.status !== "Pendding" && element.status !== "Accepted"
              );
            })
          );
      });
  }, [updateStatus, finishTime]);
  const Accept = (id) => {
    setUpdateStatus("Accepted");

    axios
      .put(`http://localhost:5000/requests/${id}`, {
        status: "Accepted",
      })
      .then((result) => {
        setReRenderStatus(reRenderStatus + 1);
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
        setReRenderStatus(reRenderStatus + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStartTime = (id) => {
    setSelectedId(id);
    const time = new Date();

    const totalHours = time.getHours() + time.getMinutes() / 60;
    setStartTime(totalHours);

    axios
      .put(`http://localhost:5000/requests/time/${id}`, {
        startTime: totalHours,
      })
      .then((result) => {
        setReRenderStatus(reRenderStatus + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getFinishTime = (id) => {
    const time = new Date();

    const totalHours = time.getHours() + time.getMinutes() / 60;
    setFinishTime(totalHours);
    axios
      .put(`http://localhost:5000/requests/time/${id}`, {
        finishTime: totalHours,
      })
      .then((result) => {
        setReRenderStatus(reRenderStatus + 1);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .put(`http://localhost:5000/requests/${id}`, {
        status: "Finished",
      })
      .then((result) => {
        setReRenderStatus(reRenderStatus + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  ////////
  const penddingRows = [];
  let penddingColumns = [];
  penddingData &&
    penddingData.map((element) => {
      penddingColumns = [
        { field: "id", headerName: "Request ID", width: 150 },
        {
          field: "serviceName",
          headerName: "Service name",
          width: 250,
          editable: false,
        },
        {
          field: "Price",
          headerName: "Service Price",
          width: 150,
          editable: false,
        },

        {
          field: "clientName",
          headerName: "Client Name",
          width: 150,
          editable: false,
        },
        {
          field: "PhoneNumber",
          headerName: "PhoneNumber",
          width: 150,
          editable: false,
        },
        {
          field: "Location",
          headerName: "Location",
          width: 150,
          editable: false,
        },
        {
          field: "status",
          headerName: "Status",
          width: 150,
          editable: false,
        },
        {
          field: "actions",
          headerName: "Actions",
          width: 250,
          editable: true,
          renderCell: (cellValues) => (
            <>
              <Button sx={{width:"100px"}} variant="contained" 
                onClick={() => {
                  Accept(cellValues.id);
                }}
                id={element._id}
              >
                Accept
              </Button>{" "}
              <Button variant="outlined" sx={{width:"100px" , color:"red", border:"red"}}  startIcon={<CancelIcon />} onClick={Reject} id={element._id}>
                Reject
              </Button>{" "}
            </>
          ),
        },
      ];
      let userName = element.userId.firstName + " " + element.userId.lastName;

      penddingRows.push({
        id: element._id,
        serviceName: element.serviceId.serviceName,
        status: element.status,
        clientName: userName,
        PhoneNumber: element.userId.phoneNumber,
        Location: element.userId.location,
        Price: element.serviceId.price + "$ per Hour",
      });
    });
  ///////
  const accpetedRows = [];
  let accpetedColumns = [];
  accpeted &&
    accpeted.map((element) => {
      accpetedColumns = [
        { field: "id", headerName: "Request ID", width: 150 },
        {
          field: "serviceName",
          headerName: "Service name",
          width: 250,
          editable: false,
        },
        {
          field: "Price",
          headerName: "Service Price",
          width: 150,
          editable: false,
        },

        {
          field: "clientName",
          headerName: "Client Name",
          width: 150,
          editable: false,
        },
        {
          field: "PhoneNumber",
          headerName: "PhoneNumber",
          width: 150,
          editable: false,
        },
        {
          field: "Location",
          headerName: "Location",
          width: 150,
          editable: false,
        },
        {
          field: "status",
          headerName: "Status",
          width: 150,
          editable: false,
        },
        {
          field: "actions",
          headerName: "Actions",
          width: 150,
          editable: true,
          renderCell: (cellValues) => (
            <>
              {!startTime ? (
                <Button variant="contained" sx={{background:"#4caf50" }}
                  onClick={() => {
                    getStartTime(cellValues.id);
                  }}
                >
                  Start
                </Button>
              ) : (
                selectedId === cellValues.id && (
                  <Button variant="contained"
                    onClick={() => {
                      getFinishTime(cellValues.id);
                    }}
                  >
                    Finish
                  </Button>
                )
              )}
            </>
          ),
        },
      ];
      let userName = element.userId.firstName + " " + element.userId.lastName;
      accpetedRows.push({
        id: element._id,
        serviceName: element.serviceId.serviceName,
        status: element.status,
        clientName: userName,
        PhoneNumber: element.userId.phoneNumber,
        Location: element.userId.location,
        Price: element.serviceId.price + "$ per Hour",
      });
    });

  ///////////
  const finishedRows = [];
  let finishedColumns = [];
  finished &&
    finished.map((element) => {
      finishedColumns = [
        { field: "id", headerName: "Request ID", width: 150 },
        {
          field: "serviceName",
          headerName: "Service name",
          width: 250,
          editable: false,
        },
        {
          field: "Price",
          headerName: "Service Price",
          width: 150,
          editable: false,
        },

        {
          field: "clientName",
          headerName: "Client Name",
          width: 150,
          editable: false,
        },
        {
          field: "PhoneNumber",
          headerName: "PhoneNumber",
          width: 150,
          editable: false,
        },
        {
          field: "Location",
          headerName: "Location",
          width: 150,
          editable: false,
        },
        {
          field: "status",
          headerName: "Status",
          width: 150,
          editable: false,
        },
        {
          field: "Totaltime",
          headerName: "Total Time",
          width: 150,
          editable: false,
        },
        {
          field: "Totalprice",
          headerName: "Total Price",
          width: 150,
          editable: false,
        },
      ];

      let totalTime = `${Math.trunc(element.finishTime - element.startTime)} hours` + ` ${Math.trunc(
                    (element.finishTime -
                      element.startTime -
                      Math.trunc(element.finishTime - element.startTime)) *
                      60
                  )} minutes `;
     let totalPrice = `${(element.finishTime - element.startTime) *
                    element.serviceId.price} $`
      let userName = element.userId.firstName + " " + element.userId.lastName;
      finishedRows.push({
        id: element._id,
        serviceName: element.serviceId.serviceName,
        status: element.status,
        clientName: userName,
        PhoneNumber: element.userId.phoneNumber,
        Location: element.userId.location,
        Price: element.serviceId.price + "$ per Hour",
        Totaltime: totalTime,
        Totalprice:totalPrice,
      });
    });
///////
const historyRows = [];
let historyColumns = [];
history &&
  history.map((element) => {
    historyColumns = [
      { field: "id", headerName: "Request ID", width: 150 },
      {
        field: "serviceName",
        headerName: "Service name",
        width: 250,
        editable: false,
      },
      {
        field: "Price",
        headerName: "Service Price",
        width: 150,
        editable: false,
      },

      {
        field: "clientName",
        headerName: "Client Name",
        width: 150,
        editable: false,
      },
      {
        field: "PhoneNumber",
        headerName: "PhoneNumber",
        width: 150,
        editable: false,
      },
      {
        field: "Location",
        headerName: "Location",
        width: 150,
        editable: false,
      },
      {
        field: "status",
        headerName: "Status",
        width: 150,
        editable: false,
      },
      
    ];
    let userName = element.userId.firstName + " " + element.userId.lastName;

    historyRows.push({
      id: element._id,
      serviceName: element.serviceId.serviceName,
      status: element.status,
      clientName: userName,
      PhoneNumber: element.userId.phoneNumber,
      Location: element.userId.location,
      Price: element.serviceId.price + "$ per Hour",
    });
  });

  return (
    <div>
      <div className="sales"></div>
      <Box sx={{ height: 400, width: '100%', backgroundColor:"#e0e0e0"}}>
      <DataGrid rows={accpetedRows} columns={accpetedColumns} initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
       disableRowSelectionOnClick/>
      </Box>
      <Box sx={{ height: 400, width: '100%', backgroundColor:"#e0e0e0"}}>

      <DataGrid rows={penddingRows} columns={penddingColumns} initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
       disableRowSelectionOnClick />      </Box>

      <Box sx={{ height: 400, width: '100%', backgroundColor:"#e0e0e0"}}>
      
      <DataGrid rows={finishedRows} columns={finishedColumns} initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
       disableRowSelectionOnClick />      </Box>


      <Box sx={{ height: 400, width: '100%' ,backgroundColor:"#e0e0e0"}}>

      <DataGrid rows={historyRows} columns={historyColumns}  initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
       disableRowSelectionOnClick />      </Box>


    </div>
  );
};

export default Dashbord;
