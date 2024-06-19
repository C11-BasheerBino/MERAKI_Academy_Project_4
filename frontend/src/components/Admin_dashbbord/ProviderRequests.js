import React, { useEffect, useState } from "react";
import axios from "axios";

const ProviderRequest = () => {
  const [showStatus, setShowStatus] = useState('');
  const showSelector = (e) => {
    setShowStatus(e.target.id);
  };
  const [selectedStatus, setSelectedStatus] = useState("");
  const [renderUpdateStatus, setRenderUpdateStatus] = useState(0);
  const updateStatus = (e) => {
    axios
      .put(`http://localhost:5000/providers/${e.target.id}`, {
        status: selectedStatus,
      })
      .then((result) => {
        setShowStatus(false);
        setRenderUpdateStatus(renderUpdateStatus + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [penddingProviders, setPenddingProviders] = useState();
  useEffect(() => {
    axios.get("http://localhost:5000/providers").then((result) => {
      setPenddingProviders(result.data.providers);
    });
  }, [renderUpdateStatus]);
  return (
    <div>
      <div>
        {penddingProviders &&
          penddingProviders.map((element) => {
            return (
              <div>
                <p>{element.firstName}</p>
                <p>{element.status}</p>

                <p>{element.workField}</p>
                <button id={element._id} onClick={showSelector}>Update Status</button>

                <div>
                  {showStatus ===element._id && (
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="Accepted">Accept</option>
                      <option value="Rejected">Reject</option>
                      <option value="Pendding">Hold The Request</option>
                    </select>
                  )}
                  {showStatus ===element._id && (
                    <button id={element._id} onClick={updateStatus}>
                      save
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProviderRequest;
