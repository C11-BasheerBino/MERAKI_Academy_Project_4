import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

const AddService = () => {
  const [allFields, setAllFields] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:5000/fields")
      .then((result) => {
        setAllFields(result.data.fields);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [newServiceName, setNewServiceName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [serviceField, setServiceField] = useState();
  const [price, setPrice] = useState();
  const user = useContext(UserContext);
  const addService = () => {
    axios
      .post("http://localhost:5000/services", {
        providerID: user.loggingId,
        serviceName: newServiceName,
        description: description,
        image: image,
        category: serviceField || "Electrical",
        price: price,
      })
      .then((result) => {
        console.log(result);
        console.log(user.loggingId);
      })
      .catch((err) => {
        console.log(err);
      });

    ///
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Service name"
        onChange={(e) => {
          setNewServiceName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="image link"
        onChange={(e) => {
          setImage(e.target.value);
        }}
      />
      <label>
        Select Your Field:
        <select
          value={serviceField}
          onChange={(e) => setServiceField(e.target.value)}
        >
          {allFields &&
            allFields.map((element) => {
              return (
                <option value={element.fieldName}>{element.fieldName}</option>
              );
            })}
        </select>
      </label>
      <input
        type="number"
        placeholder="Price Per Hour"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <button onClick={addService}>Add Service</button>
    </div>
  );
};

export default AddService;
