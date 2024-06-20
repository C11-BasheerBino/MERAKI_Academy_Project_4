const express = require("express");

const requestsRouter = express.Router();
const {
  createRequestByUser,
  updateStatusByProvider,
  getRequestbyStatus,
  getAllRequests,
  getRequestsByProviderID,
  getRequestsByUserID,
} = require("../controllers/requests");

requestsRouter.post("/", createRequestByUser);
requestsRouter.put("/:requestId", updateStatusByProvider);
requestsRouter.get("/:status", getRequestbyStatus);
requestsRouter.get("/", getAllRequests);
requestsRouter.get("/provider/:provderId", getRequestsByProviderID);
requestsRouter.get("/user/:userId", getRequestsByUserID);

module.exports = requestsRouter;
