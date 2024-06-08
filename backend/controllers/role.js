const roleSchema = require("../models/role");

const createRole = (req, res) => {
  const { role, permissions } = req.body;
  const newRole = new roleSchema({
    role,
    permissions,
  });

  newRole
    .save()
    .then((result) => {
      const keys = {
        success: true,
        message: "Success role created",
        role: result,
      };
      res.json(keys).status(201);
    })
    .catch((err) => {
      const keys = {
        success: false,
        massage: "Server error",
      };
      res.json(keys).status(500);
    });
};

module.exports = { createRole };
