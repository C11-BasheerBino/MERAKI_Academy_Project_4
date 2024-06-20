servicesModel = require("../models/services");
fieldsModel = require("../models/fields");

const createNewService = (req, res) => {
  const { providerID, serviceName, description, image, category, price } =
    req.body;
  const service = new servicesModel({
    providerID,
    serviceName,
    description,
    image,
    price,
    category:category,
  });
  service
    .save()
    .then((result) => {
      fieldsModel.findOneAndUpdate(
        { fieldName: category },
        { $push: { services: result._id } },
        { new: true }
      ).then(()=>{
      const keys = {
        success: true,
        message: 'service added successfully',
      };
      res.json(keys).status(201);})
    })
    .catch((err) => {
      keys = {
        success: false,
        message: err.message,
      };
      res.json(keys).status(500);
    });
};

const getAllServices = (req, res) => {
  servicesModel
    .find()
    .exec()
    .then((result) => {
      const keys = {
        success: true,
        message: "All the Services",
        services: result,
      };
      res.json(keys).status(200);
    })
    .catch((err) => {
      const keys = {
        success: false,
        message: "Server Error",
        err: err.message,
      };
      res.json(keys).status(500);
    });
};

const getServiceByProvider = (req, res) => {
  const id = req.params.id; //must be taked from token
  servicesModel
    .find({ providerID: id })
    .then((result) => {
      const keys = {
        success: true,
        message: "All the Services",
        services: result,
      };
      res.json(keys).status(200);
    })
    .catch((err) => {
      const keys = {
        success: false,
        message: "Server Error",
        err: err.message,
      };
      res.json(keys).status(500);
    });
};

const updateServiceById = (req, res) => {
  const _id = req.params.id;
  servicesModel
    .findByIdAndUpdate({ _id }, req.body, { new: true })
    .then((result) => {
      const keys = {
        success: true,
        message: "All the Services",
        services: result,
      };
      res.json(keys).status(200);
    })
    .catch((err) => {
      const keys = {
        success: false,
        message: "Server Error",
        err: err.message,
      };
      res.json(keys).status(500);
    });
};
const deleteServiceById = (req, res) => {
  _id = req.params.id;
  servicesModel
    .findByIdAndDelete(_id)
    .then((result) => {
      const keys = {
        success: true,
        message: "Service deleted ",
      };
      res.json(keys).status(200);
    })
    .catch((err) => {
      const keys = {
        success: false,
        message: "Server Error",
        err: err.message,
      };
      res.status(500).json(keys);
    });
};

const getServiceById = (req, res) => {
  const id = req.params.id; 
  servicesModel
    .findOne({ _id: id })
    .then((result) => {
      const keys = {
        success: true,
        message: "All the Services",
        services: result,
      };
      res.json(keys).status(200);
    })
    .catch((err) => {
      const keys = {
        success: false,
        message: "Server Error",
        err: err.message,
      };
      res.json(keys).status(500);
    });
};
module.exports = {
  createNewService,
  getAllServices,
  getServiceByProvider,
  updateServiceById,
  deleteServiceById,
  getServiceById,
};
