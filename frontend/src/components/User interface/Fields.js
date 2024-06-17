import axios from "axios";
import React, { useEffect, useState } from "react";

const Fields = () => {
  const [allFields, setAllFields] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:5000/fields")
      .then((result) => {
        console.log(result);
        setAllFields(result.data.services);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      {allFields &&
        allFields.map((elem) => {
          return (
            <div>
              <div>{elem.fieldName}</div>
              <img src={elem.image} />
              <div>{elem.description}</div>
            </div>
          );
        })}
    </div>
  );
};

export default Fields;
