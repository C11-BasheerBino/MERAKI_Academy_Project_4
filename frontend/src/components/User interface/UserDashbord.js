import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import Rate from "../shared components/Rate";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
////

///
const UserDashbord = () => {
  const user = useContext(UserContext);
  const [penddingData, setPenddingData] = useState();
  const [acceptedData, setAcceptedData] = useState();
  const [history, setHistory] = useState([]); //build backend get all rqeust then filter it without pendding
  const [rated, setRated] = useState();
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
        console.log(penddingData);

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
  ///////////////
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
          field: "providerName",
          headerName: "Provider Name",
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
          field: "status",
          headerName: "Status",
          width: 150,
          editable: false,
        },
      ];
      let userName =
        element.providerId.firstName + " " + element.providerId.lastName;

      penddingRows.push({
        id: element._id,
        serviceName: element.serviceId.serviceName,
        status: element.status,
        providerName: userName,
        PhoneNumber: element.providerId.phoneNumber,
        Price: element.serviceId.price + "$ per Hour",
      });
    });

  //////////
  const accpetedRows = [];
  let accpetedColumns = [];
  acceptedData &&
    acceptedData.map((element) => {
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
          field: "providerName",
          headerName: "Provider Name",
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
          field: "status",
          headerName: "Status",
          width: 150,
          editable: false,
        },
      ];
      let userName =
        element.providerId.firstName + " " + element.providerId.lastName;

      accpetedRows.push({
        id: element._id,
        serviceName: element.serviceId.serviceName,
        status: element.status,
        providerName: userName,
        PhoneNumber: element.providerId.phoneNumber,
        Price: element.serviceId.price + "$ per Hour",
      });
    });
  ////////

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
          field: "providerName",
          headerName: "Provider Name",
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
          field: "status",
          headerName: "Status",
          width: 150,
          editable: false,
        },
        {
          field: "Totalprice",
          headerName: "Total Price",
          width: 150,
          editable: false,
        },
        {
          field: "actions",
          headerName: "Actions",
          width: 300,
          editable: true,
          renderCell: (cellValues) => (
            <>
              {cellValues.row.status === "Finished" && (
                <Rate
                  onUpdateSucceed={() => {
                    console.log(cellValues._id);
                    setRated("Rated");
                    axios
                      .put(`http://localhost:5000/requests/${cellValues.id}`, {
                        status: "Finished and Rated",
                      })
                      .then((result) => {
                        console.log(result);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                  collection={{
                    providerId: element.providerId,
                    userId: element.userId._id,
                  }}
                />
              )}
            </>
          ),
        },
      ];
      let userName =
        element.providerId.firstName + " " + element.providerId.lastName;

         let totalPrice = `${(element.finishTime - element.startTime) *
                    element.serviceId.price} $`

      historyRows.push({
        id: element._id,
        serviceName: element.serviceId.serviceName,
        status: element.status,
        providerName: userName,
        PhoneNumber: element.providerId.phoneNumber,
        Price: element.serviceId.price + "$ per Hour",
        Totalprice:totalPrice,
      });
    });

  return (
    <div>
     
      <Box sx={{ height: 400, width: "100%" }} mt={10}>
        <DataGrid
          rows={accpetedRows}
          columns={accpetedColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />{" "}
      </Box>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={penddingRows}
          columns={penddingColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />{" "}
      </Box>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={historyRows}
          columns={historyColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />{" "}
      </Box>
    </div>
  );
};

export default UserDashbord;
